<style scoped src="./Assist.css"></style>
<template>
    <div class="row">
        <div class="col-12 text-right mb-3">
            <button class="btn btn-warning font-white" @click="refresh"><i class="fa fa-redo mr-1"></i>{{$t('general.refresh')}}</button>
        </div>
        <div class="content-tabs-left">
            <ul class="nav nav-tabs tabs-left">
                <li :class="{active:tabShow=='General'}" v-tooltip:top="$t('general.general')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='General'}"
                        @click.prevent="showTab('General')"
                    >
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <span>{{$t('general.general')}}</span>
                    </a>
                </li>
                <li v-if="permission.bills" :class="{active:tabShow=='Bills'}" v-tooltip:top="$t('menu.invoice')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='Bills'}"
                        @click.prevent="showTab('Bills')"
                    >
                        <i class="fa fa-money-bill" aria-hidden="true"></i>
                        <span>{{$t('menu.invoice')}}</span>
                    </a>
                </li>
                <li v-if="permission.reimbursement" :class="{active:tabShow=='reimbursement'}" v-tooltip:top="$t('reimbursement.reimbursement')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='reimbursement'}"
                        @click.prevent="showTab('reimbursement')"
                    >
                        <i class="fa fa-money-bill" aria-hidden="true"></i>
                        <span>{{$t('reimbursement.reimbursement')}}</span>
                    </a>
                </li>
                <li v-if="permission.add_invoice" :class="{active:tabShow=='add_invoice'}" v-tooltip:top="$t('menu.documents')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='add_invoice'}"
                        @click.prevent="showTab('add_invoice')"
                    >
                        <i class="fa fa-folder" aria-hidden="true"></i>
                        <span>{{$t('document.add')}}</span>
                    </a>
                </li>
                <li v-if="permission.documents" :class="{active:tabShow=='documents'}" v-tooltip:top="$t('menu.documents')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='documents'}"
                        @click.prevent="showTab('documents')"
                    >
                        <i class="fa fa-folder" aria-hidden="true"></i>
                        <span>{{$t('menu.documents')}}</span>
                    </a>
                </li>
               
                <li v-if="permission.notes" :class="{active:tabShow=='Note'}" v-tooltip:top="$t('assistance.notes')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='Note'}"
                        @click.prevent="showTab('Note')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span>{{$t('assistance.notes')}}</span>
                    </a>
                </li>
                <li v-if="permission.shared_notes" :class="{active:tabShow=='shared_notes'}" v-tooltip:top="$t('assistance.reimbursementNotes')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow == 'shared_notes'}"
                        @click.prevent="showTab('shared_notes')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span v-if="permission.notes">{{$t('provider.publicNote')}}</span>
                        <span v-else>{{$t('assistance.notes')}}</span>
                    </a>
                </li>
                <li v-if="permission.notes_provider" :class="{active:tabShow=='notes_provider'}" v-tooltip:top="$t('assistance.notes_provider')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='notes_provider'}"
                        @click.prevent="showTab('notes_provider')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span>{{$t('assistance.notes_provider')}}</span>
                    </a>
                </li>
                <li v-if="permission.medical_notes" :class="{active:tabShow=='medical_notes'}" v-tooltip:top="$t('assistance.medicalNotes')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='medical_notes'}"
                        @click.prevent="showTab('medical_notes')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span>{{$t('assistance.medicalNotes')}}</span>
                    </a>
                </li>
                <li v-if="permission.quality_notes" :class="{active:tabShow=='quality_notes'}" v-tooltip:top="$t('assistance.medicalNotes')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='quality_notes'}"
                        @click.prevent="showTab('quality_notes')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span>{{$t('assistance.qualityNotes')}}</span>
                    </a>
                </li>
                <li v-if="permission.refund_notes" :class="{active:tabShow=='refund_notes'}" v-tooltip:top="$t('assistance.reimbursementNotes')">
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='refund_notes'}"
                        @click.prevent="showTab('refund_notes')"
                    >
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                        <span>{{$t('assistance.reimbursementNotes')}}</span>
                    </a>
                </li>
                <li
                    v-if="permission.provider"
                    :class="{active:tabShow=='Providers'}"
                    v-tooltip:top="$t('provider.provider')"
                >
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='Providers'}"
                        @click.prevent="showTab('Providers')"
                    >
                        <i class="fa fa-ambulance" aria-hidden="true"></i>
                        <span>{{$t('provider.provider')}}</span>
                    </a>
                </li>
                <li
                    v-if="permission.time_line"
                    :class="{active:tabShow=='time_line'}"
                    v-tooltip:top="$t('assistance.timeLine')"
                >
                    <a
                        class="nav-link"
                        :class="{'m--font-success':tabShow=='time_line'}"
                        @click.prevent="showTab('time_line')"
                    >
                        <i class="fa fa-clock" aria-hidden="true"></i>
                        <span>{{$t('assistance.timeLine')}}</span>
                    </a>
                </li>
            </ul>
            <div class="tab-content container-fluid" v-if="assistBase">
                <div class="tab-pane" :class="{active:tabShow=='General'}">
                    <AssistDetail :id-assist="assistBase.idAssist"></AssistDetail>
                </div>
                <div v-if="permission.bills" class="tab-pane" :class="{active:tabShow=='Bills'}">
                    <list-bill :id-assist="assistBase.idAssist"></list-bill>
                </div>
                <div v-if="permission.reimbursement" class="tab-pane" :class="{active:tabShow=='reimbursement'}">
                    <list-reimbursement :id-assist="assistBase.idAssist"></list-reimbursement>
                </div>
                <div v-if="permission.documents" class="tab-pane" :class="{active:tabShow=='documents'}">
                    <list-files :id-assist="assistBase.idAssist"></list-files>
                </div>
                <div v-if="permission.documents" class="tab-pane" :class="{active:tabShow=='add_invoice'}">
                    <ocr-provider :id-assist="assistBase.idAssist"></ocr-provider>
                </div>
                <div v-if="permission.notes" class="tab-pane" :class="{active:tabShow=='Note'}">
                    <list-note :id-assist="assistBase.idAssist" :type="'notes'"></list-note>
                </div>
                <div v-if="permission.notes_provider" class="tab-pane" :class="{active:tabShow=='notes_provider'}">
                    <list-note :id-assist="assistBase.idAssist" can-add="Y" v-if="tabShow=='notes_provider'" :type="'notes_provider'"></list-note>
                </div>
                <div v-if="permission.medical_notes" class="tab-pane" :class="{active:tabShow=='medical_notes'}">
                    <list-note :id-assist="assistBase.idAssist" :type="'medical_notes'"></list-note>
                </div>
                <div v-if="permission.quality_notes" class="tab-pane" :class="{active:tabShow=='quality_notes'}">
                    <list-note :id-assist="assistBase.idAssist" :type="'quality_notes'"></list-note>
                </div>
                <div v-if="permission.refund_notes" class="tab-pane" :class="{active:tabShow=='refund_notes'}">
                    <list-note :id-assist="assistBase.idAssist" :type="'refund_notes'"></list-note>
                </div>
                <div v-if="permission.shared_notes" class="tab-pane" :class="{active:tabShow=='shared_notes'}">
                    <list-note :id-assist="assistBase.idAssist" :type="'shared_notes'"></list-note>
                </div>
                <div v-if="permission.provider" class="tab-pane" :class="{active:tabShow=='Providers'}">
                    <Providers :id-assist="assistBase.idAssist"></Providers>
                </div>
                <div
                    v-if="permission.time_line"
                    class="tab-pane"
                    :class="{active:tabShow=='time_line'}"
                >
                    <TimeLine :id-assist="assistBase.idAssist"></TimeLine>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ListFiles from "../AssistanceFiles/ListFiles.vue";
import ListBill from "../Bill/ListBill.vue";
import ListReimbursement from "../Reimbursement/ListReimbursement.vue";
import Providers from "../Provider/ListProviders.vue";
import ListNote from "../Note/ListNote.vue";
import TimeLine from "../timeline/TimeLine.vue";
import AssistDetail from "./AssistDetail.vue";
import ocrProvider from "./ocrProvider.vue";
export default {
    components: { Providers, ListBill, AssistDetail, ListNote, TimeLine, ListFiles,ListReimbursement, ocrProvider},
    props: ["assist"],
    data() {
        return {
            assistBase: this.assist,
            tabShow: "General",
            permission: {
                bills: this.middleware("bills", "read"),
                reimbursement: this.middleware("reimbursement_documents", "read"),
                notes: this.middleware("notes", "read"),
                medical_notes: this.middleware("medical_notes", "read"),
                quality_notes: this.middleware("quality_notes", "read"),
                refund_notes: this.middleware("refund_notes", "read"),
                shared_notes: this.middleware("shared_notes", "read"),
                notes_provider: this.middleware("notes_provider", "read"),
                provider: this.middleware("provider", "read"),
                time_line: this.middleware("time_line", "read"),
                documents: this.middleware("documents", "read"),
                add_invoice: this.middleware("add_invoice", "read"),
            }
        };
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        },
        refresh() {
            this.assistBase = null;
            setTimeout(() => {
                this.assistBase = this.assist;
            }, 100);
        }
    }
};
</script>