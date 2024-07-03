<style scoped src="../Assists/Assist.css"></style>
<style src="../Element/custom-m-loader.css"></style>
<template>
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
            <li v-tooltip:top="$t('rePricing.completeRePricing')">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='upload-documents'}"
                    @click.prevent="showTab('upload-documents')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>{{$t('rePricing.completeRePricing')}}</span>
                </a>
            </li>
            <li v-tooltip:top="$t('rePricing.uploadRepricedEOB')">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='upload-repriced-EOB'}"
                    @click.prevent="showTab('upload-repriced-EOB')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>{{$t('rePricing.uploadRepricedEOB')}}</span>
                </a>
            </li>
            <li v-tooltip:top="$t('rePricing.uploadInvoiceFee')">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='upload-invoice-FEE'}"
                    @click.prevent="showTab('upload-invoice-FEE')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>{{$t('rePricing.uploadInvoiceFee')}}</span>
                </a>
            </li>
        </ul>
        <div class="tab-content container-fluid">
            <div class="tab-pane" :class="{active:tabShow=='General'}">
                <div
                    class="m-portlet m-portlet--full-height"
                    :class="{'m-loader m-loader--metal m-loader--div':showLoader}"
                >
                    <div class="m-portlet__body m-portlet__body--no-padding">
                        <div class="row m-row--no-padding m-row--col-separator-xl">
                            <AssistAccordionDetaill class="col-md-6">
                                <template slot="title">{{$t('rePricing.claimsManagement')|upper}}</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('general.status')}}</span>
                                        <span class="m-widget16__price m--align-right">
                                            <span
                                                class="m-badge m-badge--wide"
                                                :class="['m-badge--'+rePricingDetaill.rePricing.status.color ]"
                                            >{{ rePricingDetaill.rePricing.status.label }}</span>
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('general.client')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.client }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('assistance.caseNumber') }}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.code }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('voucher.voucher') }}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.voucher }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('assistance.patientName') }}</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.contact.firstName }}
                                            {{ rePricingDetaill.rePricing.contact.lastName }}
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('assistance.date.birth') }}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.birthDate }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('general.age') }}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.age }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('general.user') }}</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.user.fullName }}
                                            <small>({{ rePricingDetaill.rePricing.user.user }})</small>
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">TPA</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ this.companyName }}
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('assistance.date.case') }}</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.assistance.reported_date }}
                                            <small>({{ rePricingDetaill.assistance.reported_hour }})</small>
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('general.sentRepricing') }}</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.createdDate.date }}
                                        </span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class="col-md-6">
                                <template slot="title">{{$t('rePricing.claimInformation')|upper}}</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('document.category')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.category }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{ $t('assistanceBills.reference') }}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.ref }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('general.date')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.date }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('general.description')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.description }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('rePricing.claimAmount')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.monto | currency(rePricingDetaill.invoice.currency)}}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.exchangeRate')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.exchangeRate | toFixed(5) }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('rePricing.claimAmount')}} USD</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.montoUsd | currency("USD")}}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.deductible')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ this.deducible }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.amountNotCovered')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ this.noCovered }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.amountToCover')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ this.covered_amount }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.benefitAmountAvailable')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ this.availablebenf }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.benefitAmountPaid')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ this.amounttopay }}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class="col-md-12">
                                <template slot="title">{{$t('invoice.invoiceFile')|upper}}</template>
                                <template slot="body">
                                    <iframe
                                        class="preview"
                                        v-if="rePricingDetaill.invoice.view == 'doc'"
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    ></iframe>
                                    <img
                                        class="preview"
                                        v-else
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    />
                                </template>
                            </AssistAccordionDetaill>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" :class="{active:tabShow=='upload-documents'}">
                <template>
                    <div>
                        <div class="row mx-0">
                            <form class="m-form col-md-12 add-files"
                                @submit.prevent="validRepricing"
                                method="POST"
                                ref="form">

                                <div class="form-group">
                                    <strong>{{$t('assistance.patientName')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            class="form-control m-input"
                                            :placeholder="$t('assistance.patientName')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.patient"
                                            ref="patient_name"
                                            disabled
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <strong>{{$t('assistance.date.birth')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            class="form-control m-input"
                                            :placeholder="$t('assistance.date.birth')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.birth_date"
                                            ref="birth_date"
                                            disabled
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-calendar-check-o"></i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <strong>{{$t('assistance.caseNumber')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            class="form-control m-input"
                                            :placeholder="$t('assistance.caseNumber')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.case_number"
                                            ref="case_number"
                                            disabled
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="fa fa-life-ring"></i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <strong>{{$t('invoice.invoiceNumber')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            class="form-control m-input"
                                            :placeholder="$t('invoice.invoiceNumber')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.invoice_id"
                                            ref="invoice_id"
                                            disabled
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="fa fa-life-ring"></i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('original_amount')}">
                                    <strong>{{$t('assistanceBills.originalAmount')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="original_amount"
                                            class="form-control m-input"
                                            :placeholder="$t('assistanceBills.originalAmount')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.original_amount"
                                            ref="original_amount"
                                            disabled
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-money"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'original_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('saving_amount')}">
                                    <strong>{{$t('invoice.savingAmount')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="saving_amount"
                                            class="form-control m-input"
                                            :placeholder="$t('invoice.savingAmount')"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.saving_amount"
                                            ref="saving_amount"
                                            v-on:change="calculateAdjustedAmount(), CalculateFeeAmount()"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-money"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'saving_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('adjusted_amount')}">
                                    <strong>{{$t('invoice.adjustedAmount')}} USD</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="adjusted_amount"
                                            class="form-control m-input"
                                            :placeholder="$t('invoice.adjustedAmount')+' USD'"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.adjusted_amount"
                                            ref="adjusted_amount"
                                            readonly
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-money"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'adjusted_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('saving')}">
                                    <strong>% Fee</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="saving"
                                            class="form-control m-input"
                                            placeholder="% Fee"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.saving"
                                            ref="saving"
                                            v-on:change="CalculateFeeAmount()"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'saving'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('fee_amount')}">
                                    <strong>{{$t('invoice.feeAmount')}} USD</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="fee_amount"
                                            class="form-control m-input"
                                            placeholder="Fee Amount"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.fee_amount"
                                            ref="fee_amount"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-money"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'fee_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('icn')}">
                                    <strong>ICN</strong>
                                    <div class="m-input-icon__icon m-input-icon__icon--left">
                                        <input
                                            type="text"
                                            name="icn"
                                            class="form-control m-input"
                                            placeholder="ICN"
                                            v-validate="'required'"
                                            v-model.lazy="inputsData.icn"
                                            ref="icn"
                                        />
                                        <!--<span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-money"></i>
                                            </span>
                                        </span>-->
                                    </div>
                                    <form-error :attribute_name="'fee_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group">
                                    <strong>{{$t('document.description')}}</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <textarea
                                            name="description"
                                            class="form-control m-input"
                                            :placeholder="$t('document.description')"
                                            v-validate="'min:2|max:255|'"
                                            v-model="inputsData.description"
                                            ref="description"
                                        ></textarea>
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-pencil-square-o"></i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    :disabled="disableForm"
                                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                    type="submit"
                                    class="btn btn-primary col-md-12 mt-3"
                                >{{$t('general.send')}}</button>
                            </form>
                        </div>
                    </div>
                </template>
            </div>
            <div class="tab-pane" :class="{active:tabShow=='upload-repriced-EOB'}">
                <div class="row">
                    <div class="form-group col-md-6">
                        <strong>{{$t('rePricing.addFormEOB')}}</strong> <input type="radio" id="form_eob" class="m-input" value="1" v-model="showOption" />
                    </div>
                    <div class="form-group col-md-6">
                        <strong>{{$t('rePricing.addRepricedEOB')}}</strong> <input type="radio" id="repriced_eob" class="m-input" value="2" v-model="showOption" />
                    </div>
                    <formEob v-show="this.showOption == 1" v-bind:rePricingId="rePricingBase.id"></formEob>
                    <uploadEob v-show="this.showOption == 2" v-bind:rePricingDetaill="rePricingDetaill"></uploadEob>
                </div>
            </div>
            <div class="tab-pane" :class="{active:tabShow=='upload-invoice-FEE'}">
                <form class="m-form col-md-12 add-invoice-fee"
                    @submit.prevent="validInvoiceFEE"
                    enctype="multipart/form-data"
                    method="POST"
                    ref="form">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group" v-if="this.rePricingDetaill.rePricing.files.invoice_fee && this.nameFee">
                                <strong>FEE ID</strong>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                    <input
                                        type="text"
                                        class="form-control m-input"
                                        placeholder="FEE ID"
                                        v-validate="'required'"
                                        v-model.lazy="this.rePricingDetaill.rePricing.files.invoice_fee"
                                        ref="FEE_ID"
                                        disabled
                                    />
                                    <span class="m-input-icon__icon m-input-icon__icon--left">
                                        <span>
                                            <i class="la la-tag"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group eob-fee">
                                <strong>{{$t('rePricing.addInvoiceFee')}}</strong>
                                <div class="custom-file" v-if="this.rePricingDetaill.rePricing.files.invoice_fee && this.nameFee && !fileFEE">
                                    <input
                                        type="file"
                                        name="fileFee"
                                        class="custom-file-input"
                                        id="fileFee"
                                        accept="application/pdf"
                                        v-validate="'ext:pdf'"
                                        ref="fileFee"
                                        v-on:change="handleFileUploadFee()"
                                    />
                                    <label
                                        class="custom-file-label"
                                        :class="['custom-file-'+$root.$i18n.locale]"
                                        for="fileFee"
                                    >{{ this.nameFee }}</label>
                                </div>
                                <div class="custom-file" v-else>
                                    <input
                                        type="file"
                                        name="fileFee"
                                        class="custom-file-input"
                                        id="fileFee"
                                        accept="application/pdf"
                                        v-validate="this.requiredFee+'|max_size|ext:pdf'"
                                        ref="fileFee"
                                        v-on:change="handleFileUploadFee()"
                                    />
                                    <label
                                        class="custom-file-label"
                                        :class="['custom-file-'+$root.$i18n.locale]"
                                        for="fileFee"
                                    >{{(typeof fileFEE =='object' && 'name' in fileFEE)?fileFEE.name:$t('document.choose')}}</label>
                                </div>
                                <div class="progress" v-if="uploadPercentage>0">
                                    <div
                                        class="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        :aria-valuenow="uploadPercentage"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        :style="{width: uploadPercentage+'%'}"
                                    ></div>
                                </div>
                                <form-error :attribute_name="'fileFee'" :errors_form="errors"></form-error>
                            </div>
                            <div class="form-group">
                                <strong>{{$t('document.description')}}</strong>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                    <textarea
                                        name="description"
                                        class="form-control m-input"
                                        :placeholder="$t('document.description')"
                                        v-validate="'min:2|max:255|'"
                                        v-model="descriptionFee"
                                        ref="description"
                                    ></textarea>
                                    <span class="m-input-icon__icon m-input-icon__icon--left">
                                        <span>
                                            <i class="la la-pencil-square-o"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                :disabled="disableForm"
                                :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                type="submit"
                                class="btn btn-primary col-md-12 mt-3"
                            >{{$t('document.send')}}</button>
                        </div>
                        <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                            <iframe
                                class="preview"
                                v-if="this.rePricingDetaill.rePricing.files.invoice_fee && this.nameFee && !previewFee"
                                :src="baseUrlApi()+'streaming/'+this.rePricingDetaill.rePricing.files.invoice_fee"
                            ></iframe>
                            <h1 v-if="!previewFee && !this.nameFee" class="m-auto d-none d-md-block">Preview</h1>
                            <iframe class="rounded h-100 w-100" v-if="previewFee" :src="previewFee" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import AssistAccordionDetaill from "../Assists/AssistAccordionDetaill.vue";
import formEob from "./formEob.vue";
import uploadEob from "./uploadEob.vue";
export default {
    props: ["re-pricing"],
    components: {
        FormError,
        customImg,
        selectFromTable,
        dateSingleBt,
        localeChanger,
        AssistAccordionDetaill,
        formEob,
        uploadEob
    },
    data() {
        return {
            rePricingBase: this.rePricing,
            rePricingDetaill: {},
            tabShow: "General",
            inputsData: {
                description: "",
                saving_amount: "",
                adjusted_amount: "",
                saving: "",
                fee_amount: "",
                original_amount: "",
                patient: "",
                birth_date: "",
                case_number: "",
                date: "",
                invoice_id: "",
                icn: ""
            },
            uploadPercentage: 0,
            disableForm: false,
            fileEOB: "",
            fileFEE: "",
            previewSrc: null,
            displayAlert: false,
            adjusted_amount_original: "",
            fee_amount_original: "",
            feeID: "",
            EobID: "",
            fileNames: {},
            company: {},
            dataAmount: {},
            nameFee: "",
            nameEob: "",
            prefix: "",
            companyName: "",
            requiredEOB: "",
            requiredFee: "",
            assistanceID: "",
            amounttopay: "",
            deducible: "",
            availablebenf: "",
            covered_amount: "",
            noCovered: "",
            showOption: 1,
            descriptionFee: ""
        };
    },
    mounted() {
        this.getAssistanceDetail();
        this.CalculateFeeAmount();
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        },
        getAssistanceDetail: function() {
            this.showLoader = true;
            this.axios
                .post("getRepricingDetaill", {
                    idRePricing: this.rePricingBase.id
                })
                .then(response => {
                    this.showLoader = false;
                    //window.console.log(response.data.RESPONSE);
                    this.rePricingDetaill = response.data.RESPONSE;
                    this.inputsData.original_amount = this.rePricingDetaill.invoice.monto+' '+ this.rePricingDetaill.invoice.currency;
                    this.inputsData.saving = this.rePricingDetaill.feeAmount.percentage_fee_amount || "";
                    this.inputsData.description = this.rePricingDetaill.rePricing.amounts.description || "";
                    this.inputsData.saving_amount = this.rePricingDetaill.rePricing.amounts.saving_amount || "";
                    this.inputsData.adjusted_amount = this.rePricingDetaill.rePricing.amounts.adjusted_amount || "";
                    this.inputsData.fee_amount = this.rePricingDetaill.rePricing.amounts.fee_amount || "";
                    this.inputsData.patient = this.rePricingDetaill.rePricing.contact.firstName+" "+this.rePricingDetaill.rePricing.contact.lastName || "";
                    this.inputsData.birth_date = this.rePricingDetaill.rePricing.contact.birthDate || "";
                    this.inputsData.case_number = this.rePricingDetaill.rePricing.assist.code || "";
                    this.feeID = this.rePricingDetaill.rePricing.files.invoice_fee;
                    this.EobID = this.rePricingDetaill.rePricing.files.EOB;
                    this.prefix = this.rePricingDetaill.assistance.prefix;
                    this.inputsData.invoice_id = this.rePricingDetaill.invoice.id;
                    this.inputsData.icn = this.rePricingDetaill.rePricing.icn;
                    this.assistanceID = this.rePricingDetaill.rePricing.assist.id
                    this.noCovered = this.rePricingDetaill.invoice.not_covered;
                    this.descriptionFee = this.rePricingDetaill.rePricing.files.description_fee;

                    this.getFileNames();
                    this.companyData();
                    this.billAmounts();
                });
        },
        getFileNames: function(){
            this.axios
                .post("fileNames", {
                    feeID: this.feeID,
                    EobID: this.EobID
                })
                .then(response => {
                    this.fileNames = response.data.RESPONSE;

                    if (this.fileNames !== 'ERROR') {
                        this.fileNames.forEach(element => {
                            if (element.category == '47') {
                                this.nameFee = element.FileName;
                                this.inputsData.date = element.dateInvoice;
                            }
                            if (element.category == '20') {
                                this.nameEob = element.FileName;
                            }
                        });
                    }
                });
        },
        setDataFilter: function(campo, value) {
            this.inputsData[campo] = value;
        },
        handleFileUploadFee: function() {
            this.fileFEE = this.$refs.fileFee.files[0];
        },
        calculateAdjustedAmount: function() {
            this.inputsData.adjusted_amount =  (this.rePricingDetaill.invoice.monto - this.inputsData.saving_amount).toPrecision(4);
            this.adjusted_amount_original =  (this.rePricingDetaill.invoice.monto - this.inputsData.saving_amount).toPrecision(4);
        },
        CalculateFeeAmount: function() {
            this.inputsData.fee_amount = ((this.inputsData.saving_amount * this.inputsData.saving) / 100).toPrecision(4);
            this.fee_amount_original = ((this.inputsData.saving_amount * this.inputsData.saving) / 100).toPrecision(4);
        },
        validRepricing: function() {
            if (!this.disableForm) {
                
                this.$validator.validateAll().then(result => {
                    window.console.log("validateAll", result);
                    let formData = new FormData();
                    formData.append("saving_amount", this.inputsData.saving_amount);
                    formData.append("adjusted_amount", this.inputsData.adjusted_amount);
                    formData.append("saving", this.inputsData.saving);
                    formData.append("fee_amount", this.inputsData.fee_amount);
                    formData.append("description", this.inputsData.description);
                    formData.append("userID", this.$session.get("idUser"));
                    formData.append("user", this.$session.get("user"));
                    formData.append("repricingId", this.rePricingBase.id);
                    formData.append("originalAmount", this.rePricingDetaill.invoice.monto);
                    formData.append("assistanceId", this.rePricingDetaill.rePricing.assist.id);
                    formData.append("assistanceCode", this.rePricingDetaill.rePricing.assist.code);
                    formData.append("providerRepricingId", this.rePricingDetaill.rePricing.providerRepricing);
                    formData.append("adjusted_amount_original", this.adjusted_amount_original || this.inputsData.adjusted_amount);
                    formData.append("fee_amount_original", this.fee_amount_original || this.inputsData.fee_amount);
                    formData.append("saving_original", (this.inputsData.saving != this.rePricingDetaill.feeAmount.percentage_fee_amount) ? this.rePricingDetaill.feeAmount.percentage_fee_amount : this.inputsData.saving);
                    formData.append("icn", this.inputsData.icn );

                    /*const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        },
                        onUploadProgress: function(progressEvent) {
                            this.uploadPercentage = parseInt(
                                Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total
                                )
                            );
                        }.bind(this)
                    }*/

                    if (result) {
                        this.disableForm = true;
                        this.axios.post("completeRepricing", formData)
                            .then(response => {
                                window.console.log(response);
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.$emit("completeRepricing", response.data.RESPONSE);
                                    window.Swal.fire({
                                        title: this.$t("general.sent"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t("general.ok"),
                                        cancelButtonText: this.$t("general.no")
                                    });
                                } else {
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                        }
                                    }
                                    window.Swal.fire({
                                        title: response.data.MESSAGE||"Error Form",
                                        confirmButtonText: this.$t("general.ok"),
                                        type: "error"
                                    });
                                }
                                this.uploadPercentage = 0;
                            });
                    }
                });
            }
        },
        validInvoiceFEE: function() {
            if (!this.disableForm) {
                
                let formData = new FormData();
                formData.append("fileFee", this.fileFEE);
                formData.append("userID", this.$session.get("idUser"));
                formData.append("user", this.$session.get("user"));
                formData.append("repricingId", this.rePricingBase.id);
                formData.append("nameFee", this.nameFee);
                formData.append("assistanceId", this.rePricingDetaill.rePricing.assist.id);
                formData.append("assistanceCode", this.rePricingDetaill.rePricing.assist.code);
                formData.append("date", this.inputsData.date);
                formData.append("providerRepricingId", this.rePricingDetaill.rePricing.providerRepricing);
                formData.append("description", this.descriptionFee);
                formData.append("patient", this.inputsData.patient);

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    onUploadProgress: function(progressEvent) {
                        this.uploadPercentage = parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        );
                    }.bind(this)
                }

                this.disableForm = true;
                this.axios.post("addFilesRepricing", formData, config)
                    .then(response => {
                        window.console.log(response);
                        this.disableForm = false;
                        if (response.data.STATUS == "OK") {
                            this.$emit("addFilesRepricing", response.data.RESPONSE);
                            window.Swal.fire({
                                title: this.$t("general.sent"),
                                text: this.$t("document.uploaded"),
                                type: "success",
                                showCancelButton: true,
                                confirmButtonText: this.$t("general.ok"),
                                cancelButtonText: this.$t("general.no")
                            });
                        } else {
                            if (response.data.ERRORS) {
                                for (var prop in response.data.ERRORS) {
                                    this.errors.add({
                                        field: prop,
                                        msg: response.data.ERRORS[prop]
                                    });
                                }
                            }
                            window.Swal.fire({
                                title: response.data.MESSAGE||"Error Form",
                                confirmButtonText: this.$t("general.ok"),
                                type: "error"
                            });
                        }
                        this.uploadPercentage = 0;
                    });
            }
        },
        companyData: function(){
            this.axios
                .post("getCompanyData", {
                    prefix: this.prefix
                })
                .then(response => {
                    this.company = response.data.RESPONSE;

                    if (this.company !== 'ERROR') {
                        this.companyName = this.company[0].company
                    }
                });
        },
        billAmounts: function() {
            this.axios
                .post("getBillAmounts", {
                    fileID: this.inputsData.invoice_id,
                    asistanceID: this.assistanceID
                })
                .then(response => {
                    this.dataAmount = response.data.RESPONSE;
                    if (this.dataAmount !== 'ERROR') {
                        this.amounttopay = this.dataAmount.amounttopay;
                        this.deducible = this.dataAmount.deducible;
                        this.availablebenf = this.dataAmount.availablebenf;
                        this.covered_amount = this.dataAmount.covered_amount;
                    }
                });
        },
        requiredFile: function(event){
            
            if (event.checked && event.value == 1) {
                this.requiredEOB = "required";
            } else if (!event.checked && event.value == 1) {
                this.requiredEOB = "";
            }

            if (event.checked && event.value == 2) {
                this.requiredFee = "required";
            } else if (!event.checked && event.value == 2) {
                this.requiredFee = "";
            }
        }
    },
    computed: {
        previewFee: function() {
            if (!this.fileFEE || this.errors.has("fileFee")) {
                return false;
            }
            return URL.createObjectURL(this.fileFEE);
        },
    }
};
</script>