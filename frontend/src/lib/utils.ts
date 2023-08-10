import { goto } from "$app/navigation";
import { toastStore } from "@skeletonlabs/skeleton";
import { pb } from "./pocketbase";

function constructDebounce(func: (value: any) => void, durationMS: number) {
	let timer: NodeJS.Timeout | undefined = undefined;

	return (value: any) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func(value);
		}, durationMS);
	};
}

function createForm(obj: any) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            formData.append(key + typeof obj[key], JSON.stringify(obj[key]));
        } else {
            formData.append(key + typeof obj[key], obj[key].toString());
        }
    });
    return formData;
}

function readForm(formData: FormData) {
    const baseData = Object.fromEntries(formData.entries()) as object;

    const data = {};

    Object.keys(baseData).forEach((key) => {
        let value = baseData[key];

        if (key.endsWith('object')) {
            value = JSON.parse(value);
            key = key.slice(0, -6);
        } else if (key.endsWith('number')) {
            value = parseInt(value);
            key = key.slice(0, -6);
        } else if (key.endsWith('boolean')) {
            value = value === 'true';
            key = key.slice(0, -7);
        } else if (key.endsWith('string')) {
            value = value.toString();
            key = key.slice(0, -6);
        }

        data[key] = value;
    });

    return data;
}

function formAction(formAction: string) {
	// get the current url string
	const url = window.location.href;
	return url + formAction;
}

async function sendToServer(endpoint: string, data?: object): Promise<ServerResponse> {
    // if it starts with ? make it relative to the current url
    if (endpoint.startsWith('?')) {
        endpoint = window.location.pathname + endpoint;
    }
	// if fetch fails, forward the error to the caller
    let response = undefined;
    if (data) {
        const formData = createForm(data);
        response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
    } else {
        response = await fetch(endpoint);
    }

	const json = await response.json();
    if (json.type === "redirect") {
        goto(json.location);
        return json as ServerResponse;
    }
    const badData = JSON.parse(json.data);
	json.body = fixData(badData[0], badData);
	delete json.data;

	if (json.body.status) {
		json.status = json.body.status;
		delete json.body.status;
	}

	if (json.body.type) {
		json.type = json.body.type;
		delete json.body.type;
	}
	return json as ServerResponse;
}

type ServerResponse = {
	status: number;
	type: 'success' | 'fail' | 'error' | 'redirect';
	body?: any;
    location?: string;
};

function fixData(data: number | string | object, array: Array<any>) {
	if (typeof data === "object") {
        // if the object is an array then loop through it and replace all the numbers with array[number]
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                data[index] = fixData(array[item], array);
            });
        } else {
            Object.keys(data).forEach((key) => {
                data[key] = fixData(array[data[key]], array);
            });
        }

        return data;
    } else {
        return data;
    }
}

async function logout() {
    const request = await sendToServer('/logout', {});

    if (request.type === "redirect" && request?.location === "/") {
        pb.authStore.clear();
    }

    toastStore.trigger({
        message: "You have been logged out",
    });
}

export { constructDebounce, createForm, formAction, sendToServer, readForm, logout };