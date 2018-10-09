<template>
    <div class="clearfix">
        <div class="col-xs-12" v-for="(title, key) in items">
            <label class="css-input switch switch-sm switch-primary" :dusk="dusk(key)">
                <input type="checkbox" :value="key" v-model="selected" @change="handleChange">
                <span></span> {{ resolveTitle(title) }}
            </label>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            items: {
                type: Object,
                default() {
                    return {};
                },
            },
            value: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                selected: this.value
            };
        },
        methods: {
            handleChange() {
                this.$emit('input', this.selected);
            },
            dusk(key) {
                return 'group-checkbox-' + key;
            },
            resolveTitle(title) {
                if (typeof title === 'function') {
                    return title();
                }

                return title;
            }
        }
    }
</script>
