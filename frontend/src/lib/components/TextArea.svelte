<script lang="ts">
	import { constructDebounce } from "$lib/utils";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let maxlength: number | undefined = undefined;
    export let value = '';
    export let length = 0;
    export let placeholder = '';
    export let label = '';
    export let required = false;
    export let debounce = false;
    export let debouncetime = 500;
    export let validation = (value: string) => true;
    export let valid = true;
    export let invalid = false;
    export let error = '';
    export let rows = 3;

    let buffer = value;

    $: invalid = !valid;

    $: setBuffer(value);

    function setBuffer(value: string) {
        buffer = value;
    }

    $: if (!debounce) {
        valid = validation(buffer);

        if (valid) {
            value = buffer;
        }
    }

    $: { buffer; onChange(); }
    $: { invalid; onInvalid(); }

    function onInvalid() {
        if (invalid) {
            dispatch('invalid', { value: buffer });
        }
    }

    function onChange() {
        dispatch('change', { value: buffer });
    }

    const debounceCallback = constructDebounce((value) => {
        console.log("debounce");
        valid = validation(buffer);

        if (valid) {
            value = buffer;
        }

        dispatch('debounce', { value: buffer });
    }, debouncetime);

    $: if (debounce) debounceCallback(buffer);

    $: length = buffer.length;
</script>

<div class="{$$restProps.class || ''} relative">
    <label class="label">
        {#if label}
        <div class="flex justify-between items-center">
            <span class="text-surface-600-300-token">{label}<span class="text-error-500-400-token">{required ? '*' : ''}</span></span>
        </div>
        {/if}
        <textarea class="input peer" {rows} class:input-error={invalid} on:invalid on:focus on:blur on:click on:input bind:value={buffer} {maxlength} {placeholder} />
        {#if maxlength}
            <div class="peer-focus:opacity-100 opacity-0 transition-opacity text-xs text-right text-gray-500 absolute top-0.5" class:right-2={label.length === 0}  class:right-0={label.length > 0}>
                {length} / {maxlength}
            </div>
        {/if}
    </label>
</div>