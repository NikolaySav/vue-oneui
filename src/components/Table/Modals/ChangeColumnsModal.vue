<template>
    <modal :title="$t('title')" :show="opened" @close="onClose">
        <template slot="body">
            <group-checkbox :items="items" v-model="selected" v-if="selected.length > 0"/>
        </template>
        <template slot="footer">
            <button type="button" class="btn btn-default" @click="onClose">{{ $t('cancel') }}</button>
            <button type="button" class="btn btn-primary" @click="onSave">{{ $t('submit') }}</button>
        </template>
    </modal>
</template>

<script>
    import EventBus from '../../../plugins/events/bus';
    import {CHANGE_COLUMNS_MODAL_SHOW} from '../../../plugins/events';
    import GroupCheckbox from '../../Base/GroupCheckbox';
    import Modal from '../../Modal';

    export default {
        components: {
            GroupCheckbox,
            Modal,
        },
        data: () => ({
            opened: false,
            selected: [],
            updateColumns: () => {
            },
            columns: []
        }),
        computed: {
            items() {
                return this.columns.filter(column => column.title)
                    .reduce((obj, column) => (obj[column.name] = column.title, obj), {});
            }
        },
        methods: {
            onClose() {
                this.opened = false;
                this.selected = [];
            },
            onSave() {
                const columns = this.columns.map(({name, title, visible, ...props}) => {
                    return {
                        name,
                        title,
                        visible: !title || this.selected.includes(name),  // display columns w/o title, e.g. Actions
                        ...props
                    };
                });

                this.updateColumns(columns);
                this.onClose();
            },
            showModal() {
                this.opened = true;
                // Resolve selected columns before show modal
                this.selected = this.columns.filter(column => column.visible).map(column => column.name);
            }
        },
        mounted() {
            EventBus.$on(CHANGE_COLUMNS_MODAL_SHOW, (columns, updateColumns) => {
                this.columns = columns;
                this.updateColumns = updateColumns;
                this.showModal();
            });
        },
        beforeDestroy() {
            EventBus.$off(CHANGE_COLUMNS_MODAL_SHOW);
        },
        i18n: {
            messages: {
                en: {
                    title: 'Change columns',
                    submit: 'Apply',
                    cancel: 'Cancel',
                },
                ru: {
                    title: 'Изменить набор столбцов',
                    submit: 'Применить',
                    cancel: 'Отменить',
                },
            },
        },
    }
</script>
