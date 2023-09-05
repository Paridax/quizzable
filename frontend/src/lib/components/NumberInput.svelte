<script lang="ts">
    export let id: string;
    export let name: string;
    export let placeholder = '';
    export let maxLength: number;
    export let max: number;
    export let min: number;
    export let classes: string;

    export let value = '';

    function handleInput(event) {
        // Remove any non-numeric characters from the input value
        value = event.target.value.replace(/[^0-9]/g, '');

        // Enforce maxLength if provided
        if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength);
        }

        // Enforce max if provided
        if (max && +value > max) {
            value = max.toString();
        }

        // Enforce min if provided
        if (min && +value < min) {
            value = min.toString();
        }
    }
</script>

<style>
  /* Add any custom styles here */
</style>

<input
  type="text"
  class={classes}
  {id}
  {name}
  {placeholder}
  bind:value
  on:input={handleInput}
  inputmode="numeric"
/>