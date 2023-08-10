<script lang="ts">
	import Loading from "../../components/Loading.svelte";

    export let data: {
        setId: string;
        set: {
            title: string;
        };
        cards: {

        };
    };
</script>

{#if !data}
    <Loading />
{:else}
    <main>
        <h1>{data.set?.title}</h1>
    </main>
{/if}