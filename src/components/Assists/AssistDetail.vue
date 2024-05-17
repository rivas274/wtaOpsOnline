<style src="../Element/custom-m-loader.css"></style>
<style scoped src="../Assists/Assist.css"></style>
<style scoped>
.options-btn {
    display: inline-flex;
}
</style>
<style>
[data-toggle="popover"] .popover-content {
    display: none;
}
.popover {
    z-index: 98;
}
.popover-body {
    overflow-y: auto;
    max-height: 400px;
}
iframe{
    border: 0px !important;
}
</style>
<template>
    <div
        class="m-portlet m-portlet--full-height"
        :class="{'m-loader m-loader--metal m-loader--div':showLoader}"
    >
        <div class="m-portlet__body">
            <progress-bar :id-assist="idAssist"></progress-bar>
            <div
            
                class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg"
                :id="'m_accordion_'+idAssist"
                role="tablist"
            >
        
                <div class="modal fade" id="exampleModalLong" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{{$t('assistance.rejectCase')}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <i aria-hidden="true" class="ki ki-close"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                {{$t('assistance.reasonForCaseCancellation')}} <br>
                                <input type="text" class="form-control" name="motivo" id="motivo" v-model="motivo" ref="motivo" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">{{$t('general.cancel')}}</button>
                                <button v-if="assistances.is_asigne==1" type="button" class="btn btn-primary font-weight-bold" data-dismiss="modal" @click="rechazar">{{$t('assistance.rejectCase')}}</button>
                            </div>
                        </div>
                    </div>
                </div> 


                <div class="modal fade" id="finish" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="finish">{{$t('assistance.caseFinished')}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <i aria-hidden="true" class="ki ki-close"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                {{$t('assistance.detail')}} <br>
                                <input type="text" class="form-control" name="motivo_finalizado" id="motivo_finalizado" v-model="motivo_finalizado" ref="motivo_finalizado" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">{{$t('general.cancel')}}</button>
                                <button v-if="assistances.is_asigne==1" type="button" class="btn btn-primary font-weight-bold"  @click="finalizar">{{$t('assistance.Finish')}}</button>
                            </div>
                        </div>
                    </div>
                </div> 


                <div v-if="assistances.is_asigne==1" style="float: right; position: relative; top: -50px;height: 10px; ">
                  
                        <button v-if="assistances.approved_status_user==2 && permission.show_provider" class="btn btn-info" style="margin-bottom: 4px;" data-toggle="modal" data-target="#finish">{{$t('assistance.Finish')}}</button>
                        <button v-if="assistances.approved_status_user==1 && permission.show_provider" class="btn btn-info" style="margin-bottom: 4px;"  @click="aprobar">{{$t('assistance.AcceptCase')}}</button>
            
                    <br>
                        <button style="float: right; position: absolute;" v-if="assistances.approved_status_user==1 && permission.show_provider" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                        {{$t('assistance.rejectCase')}}
                        </button>
                </div><br><br>
                
                <div class="alert alert-success alert-dismissible fade show" v-if="notificationApprove" role="alert"  name="notificationApprove" id="notificationApprove"  ref="notificationApprove">
                    <strong>{{$t('assistance.caseAccepted')}}.</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="notificationFinish" role="alert"  name="notificationFinish" id="notificationFinish"  ref="notificationFinish">
                    <strong>{{$t('assistance.caseFinished')}}.</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="notificationRejected" role="alert"  name="notificationRejected" id="notificationRejected"  ref="notificationRejected">
                    <strong>{{$t('assistance.caseRejected')}}.</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <AssistAccordion :id="'_general_'+idAssist" ico="fa flaticon-user-ok" v-if="!permission.hidden_tab_voucher && 'voucher' in assistances">
                    <template slot="title" >{{ $t('voucher.voucher') | upper}} <small v-if="'code' in assistances.voucher">({{assistances.voucher.code}})</small></template>
                    <template slot="body">
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{$t('voucher.travelSource')|upper}}</template>
                            <template slot="body">
                                <div class="m-widget16__item" v-if="assistances.voucher">
                                    <span class="m-widget16__date">{{$t('voucher.travelSource')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        <Flag :iso="assistances.voucher.source"></Flag>
                                    </span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('voucher.destination')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.destination || $t('general.notLoaded')}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.voucher.namePlan">
                                    <span class="m-widget16__date">{{$t('voucher.plan')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.namePlan}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.from')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.startDate}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.to')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.endDate}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.days')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.days}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('voucher.date.purchase')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.purchaseDate}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4" v-if ="'passenger' in assistances">
                            <template slot="title">{{$t('voucher.passenger')|upper}}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.firstName')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-html="assistances.passenger.firstName"
                                    ></span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.lastName')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-html="assistances.passenger.lastName"
                                    ></span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.passenger.email">
                                    <span class="m-widget16__date">{{$t('general.email')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.passenger.email}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.passenger.phone">
                                    <span class="m-widget16__date">{{$t('general.phone')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.passenger.phone}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.passenger.passport">
                                    <span class="m-widget16__date">{{$t('general.passport')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.passenger.passport}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.dateOfBirth')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.passenger.birthDate}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.age')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.passenger.age}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{$t('general.additionalInformation')|upper}}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.observations')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-if="!assistances.voucher.comments.comments"
                                    >{{$t('general.notLoaded')}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.voucher.comments.comments"
                                >
                                    <span
                                        class="m-widget16__price"
                                        v-html="assistances.voucher.comments.comments"
                                    ></span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('voucher.medicalComments')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-if="!assistances.voucher.comments.medical"
                                    >{{$t('general.notLoaded')}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.voucher.comments.medical"
                                >
                                    <span
                                        class="m-widget16__price"
                                        v-html="assistances.voucher.comments.medical"
                                    ></span>
                                </div>
                                <div
                                    class="m-widget16__head"
                                    v-if="assistances.voucher.contact.name || assistances.voucher.contact.email || assistances.voucher.contact.phone"
                                >
                                    <div class="m-widget16__item">
                                        <span
                                            class="m-widget16__amount m--align-center"
                                        >{{$t('voucher.emergencyContact')|upper}}</span>
                                    </div>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.voucher.contact.name"
                                >
                                    <span class="m-widget16__date">{{$t('general.name')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.contact.name}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.voucher.contact.email"
                                >
                                    <span class="m-widget16__date">{{$t('general.email')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.contact.email}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.voucher.contact.phone"
                                >
                                    <span class="m-widget16__date">{{$t('general.phone')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.voucher.contact.phone}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="benefit.SOURCE">
                                    <span class="m-widget16__date">{{$t('voucher.benefits')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        {{benefit.SOURCE}}
                                        <pop-over
                                            class="btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill"
                                            :placement="'left'"
                                            :title="benefit.SOURCE + ' |   ' + (assistances.voucher.namePlan || '')"
                                        >
                                            <template slot="button">
                                                <i class="flaticon-suitcase"></i>
                                            </template>
                                            <template slot="content">
                                                <table
                                                    align="center"
                                                    class="table table-striped table-bordered"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <strong>{{$t('general.description')}}</strong>
                                                            </th>
                                                            <th>
                                                                <strong>{{$t('general.value')}}</strong>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template v-for="benf in benefit.BENEFIT">
                                                            <tr :key="benf.id" v-if="benf.name">
                                                                <td v-html="benf.name"></td>
                                                                <td v-html="benf.valor||$t('general.notApplicable')"></td>
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </table>
                                            </template>
                                        </pop-over>
                                    </span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_general_conditions_'+idAssist" ico="fa flaticon-file" v-if="!permission.hidden_tab_voucher">
                    <template slot="title">{{ $t('assistance.generalConditions') | upper }}</template>
                    <template slot="body">
                        <iframe class="preview"
                            :src="baseUrlApi()+'GeneralConditions/file/'+assistances.codeAssist"
                        ></iframe>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_assistance_'+idAssist" ico="fa flaticon-computer">
                    <template slot="title">{{ $t('assistance.assistance') | upper }} <small>({{assistances.codeAssist}})</small></template>
                    <template slot="body">
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{ $t('assistance.contact') | upper }}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.firstName')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-html="assistances.contact.firstName"
                                    ></span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.lastName')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-html="assistances.contact.lastName"
                                    ></span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.email')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.email}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.phone')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.phone}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.passport')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.passport}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.dateOfBirth')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.birthDate}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.age')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.age}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.gender')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.genre | genreDetaill | t}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{ $t('assistance.information') | upper }}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.status')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.statusAssist.label || $t('general.notLoaded')}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('assistance.date.opening')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        {{assistances.registeredDate.date}}
                                        <small><b>({{assistances.registeredDate.hour}})</b></small>
                                    </span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('assistance.date.event')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        {{assistances.reportedDate.date}}
                                        <small><b>({{assistances.reportedDate.hour}})</b></small>
                                    </span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('voucher.source')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.origenAssist}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('assistance.relation')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.contact.relation}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('assistance.typeAssistance')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.assistanceType.description}}</span>
                                </div>
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('assistance.symptom')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.symptom.description}} </span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <div class="col-md-4">
                            <AssistAccordionDetaill>
                                <template slot="title">{{$t('general.description')|upper}}</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span
                                            class="m-widget16__date m--align-center"
                                            v-if="assistances.contact.observations"
                                            v-html="assistances.contact.observations"
                                        ></span>
                                        <span class="m-widget16__date m--align-center" v-else>{{$t('general.notLoaded')}}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill>
                                <template slot="title">{{$t('general.observations')|upper}}</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span
                                            class="m-widget16__date m--align-center"
                                            v-if="assistances.remark"
                                            v-html="assistances.remark"
                                        ></span>
                                        <span class="m-widget16__date m--align-center" v-else>{{$t('general.notLoaded')}}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                        </div>
                        <div class="col-md-4">
                            <AssistAccordionDetaill>
                                <template slot="title">{{ $t('supervision.supervision') | upper }}</template>
                                <template slot="body">
                                    <div class="m-widget16__item" v-if="assistances.showautorizegod==Y &&  (assistances.assistanceType.idType==77 || assistances.assistanceType.idType == 78)">
                                        <span class="m-widget16__date">{{$t('general.authorizedgop')}}</span>
                                        <span v-if="assistances.authorizedgop == 1" class="m-widget16__price m--align-right">
                                            {{$t('general.yes')}}
                                        </span>
                                        <span v-if="assistances.authorizedgop == 0 || !assistances.authorizedgop" class="m-widget16__price m--align-right">
                                            {{$t('general.no')}}
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistance.typeCoordination')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{assistances.coordination.description}}</span>
                                    </div>
                                    <div class="m-widget16__item" >
                                        <span class="m-widget16__date">{{$t('voucher.benefit')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                            v-if="assistances.evento.name"
                                        >{{ assistances.evento.name }} </span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                            v-else
                                        >{{  $t('notification.pending')}} </span>
                                    </div>
                                    <div class="m-widget16__item" >
                                        <span class="m-widget16__date">
                                            {{$t('invoice.benefitValue')}} USD
                                        </span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ assistances.evento.maxAmount | currency(assistances.evento.currency) }}</span>
                                    </div>
                                    <div class="m-widget16__item" >
                                        <span class="m-widget16__date">
                                            {{$t('assistanceBills.exchangeRate')}}
                                        </span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ assistances.evento.exchangeRate }}</span>
                                    </div>
                                    <div class="m-widget16__item" >
                                        <span class="m-widget16__date">
                                            {{$t('invoice.benefitValue')}}
                                        </span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ assistances.evento.maxAmountUsd | currency('USD') }}</span>
                                    </div>
                                    <div class="m-widget16__item" >
                                        <span class="m-widget16__date">
                                            {{$t('invoice.consumedBenefit')}}
                                        </span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ assistances.evento.consumedAmount | currency("USD") }}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                        </div>
                        <AssistAccordionDetaill class="col-md-4" v-if="Object.keys(assistances.caseTypeField).length>0">
                            <template slot="title">{{$t('assistance.caseTypeFields')}}</template>
                            <template slot="body">
                                <div
                                    class="m-widget16__item"
                                    v-for="(field,key) in assistances.caseTypeField"
                                    :key="key"
                                >
                                    <span class="m-widget16__date">{{ field.name }}</span>
                                    <span class="m-widget16__price m--align-right">{{ field.value }}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4" v-if="Object.keys(assistances.insuranceField).length>0 && !permission.show_provider"> 
                            <template slot="title">{{$t('assistance.insuranceFields')}}</template>
                            <template slot="body">
                                <div
                                    class="m-widget16__item"
                                    v-for="(field,key) in assistances.insuranceField"
                                    :key="key"
                                >
                                    <span class="m-widget16__date">{{ field.name }}</span>
                                    <span class="m-widget16__price m--align-right">{{ field.value }}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_address_'+idAssist" ico="fa flaticon-placeholder">
                    <template slot="title">{{$t('general.address')|upper}}</template>
                    <template slot="body">
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{$t('general.country')|upper}}</template>
                            <template slot="body">
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.country.iso"
                                >
                                    <span class="m-widget16__date">{{$t('assistance.countryService')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        <Flag :iso="assistances.location.country.iso"></Flag>
                                    </span>
                                </div>
                                <div
                                    class="m-widget16__item"    
                                    v-if="assistances.location.state.description"
                                >
                                    <span class="m-widget16__date">{{$t('general.state')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.state.description}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.city.description"
                                >
                                    <span class="m-widget16__date">{{$t('general.city')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.city.description}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{$t('general.address')|upper}}</template>
                            <template slot="body">
                                <div class="m-widget16__item" v-if="assistances.location.address">
                                    <span class="m-widget16__date">{{$t('general.address')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                        v-html="assistances.location.address"
                                    ></span>
                                    
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.optionalAddress"
                                >
                                    <span class="m-widget16__date">{{$t('general.optionalAddress')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.optionalAddress}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.location.zipCode>0">
                                    <span class="m-widget16__date">{{$t('general.zipCode')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.zipCode}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.location.namePlace">
                                    <span class="m-widget16__date">{{$t('assistance.namePlace')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.namePlace}}</span>
                                </div>
                                <div class="m-widget16__item" v-if="assistances.location.room">
                                    <span class="m-widget16__date">{{$t('assistance.room')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.room}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill class="col-md-4">
                            <template slot="title">{{$t('general.contact')|upper}}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.phone')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.phone}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.coordinates.lat"
                                >
                                    <span class="m-widget16__date">{{$t('assistance.coordinates')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        <a
                                            :href="'https://www.google.com/maps/@'+assistances.location.coordinates.lat+','+assistances.location.coordinates.lng+',16z'"
                                            target="_blank"
                                        >
                                            <i class="la la-map-marker"></i>{{$t('assistance.showMap')}}
                                        </a>
                                    </span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.coordinates.lat"
                                >
                                    <span class="m-widget16__date">{{$t('assistance.latitud')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.coordinates.lat|toFixed(7)}}</span>
                                </div>
                                <div
                                    class="m-widget16__item"
                                    v-if="assistances.location.coordinates.lng"
                                >
                                    <span class="m-widget16__date">{{$t('assistance.longitud')}}</span>
                                    <span
                                        class="m-widget16__price m--align-right"
                                    >{{assistances.location.coordinates.lng|toFixed(7)}}</span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_triage_'+idAssist" ico="fa flaticon-list" v-if="permission.triage">
                    <template slot="title">
                        {{$t('assistance.triage')|upper}}
                        <span class="text-danger" v-if="assistances.triage!='F'">({{$t('general.notApplicable')}})</span>
                    </template>
                    <template slot="title-left" v-if="assistances.triage=='F'">
                        <a href="#" @click="donwload(assistances.codeAssist,'TRIAGE')">
                            <i class="fa fa-lg fa-cloud-download-alt"></i>
                        </a>
                    </template>
                    <template slot="body" v-if="assistances.triage=='F'">
                        <iframe class="preview"
                                :src="baseUrlApi()+'provider-files/TRIAGE/'+assistances.codeAssist"
                        ></iframe>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_facial_'+idAssist" ico="fa flaticon-avatar" v-if="permission.facial_scan">
                    <template slot="title">
                        {{$t('assistance.facial_scan')|upper}}
                        <span class="text-danger" v-if="assistances.facialScan!='F'">({{$t('general.notApplicable')}})</span>
                    </template>
                    <template slot="title-left" v-if="assistances.facialScan=='F'">
                        
                        <a href="#"  @click="donwload(assistances.codeAssist,'FACIALSCAN')">
                            <i class="fa fa-lg fa-cloud-download-alt"></i>
                        </a>
                       
                    </template>
                    <template slot="body" v-if="assistances.facialScan=='F'">
                        <iframe class="preview"
                                :src="baseUrlApi()+'provider-files/FACIALSCAN/'+assistances.codeAssist"
                        ></iframe>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_gop_'+idAssist" ico="fa flaticon-interface-5" v-if="assistances.is_asigne==1 && permission.hidden_tab_voucher">
                    <template slot="title">{{$t('assistance.GOP')|upper}}</template>
                    <template slot="title-left">
                        <a href="#" @click="donwload(assistances.codeAssist,'VOB')">
                            <i class="fa fa-lg fa-cloud-download-alt"></i>
                        </a>
                      
                    </template>
                    <template slot="body">
                        <iframe class="preview"
                                :src="baseUrlApi()+'provider-files/VOB/'+assistances.codeAssist"
                        ></iframe>
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_credit_auth_'+idAssist" ico="fa flaticon-lock" v-if="assistances.is_asigne==1 && permission.hidden_tab_voucher">
                    <template slot="title">{{$t('assistance.authorization')|upper}}</template>
                    <template slot="title-left">
                        <a href="#" @click="donwload(assistances.codeAssist,'AUTORIZATION')">
                            <i class="fa fa-lg fa-cloud-download-alt"></i>
                        </a>
                     
                    </template>
                    <template slot="body">   
                        <iframe class="preview" name="printf" id="printf"
                                :src="baseUrlApi()+'provider-files/AUTORIZATION/'+assistances.codeAssist"
                        ></iframe>
                        
                    </template>
                </AssistAccordion>
                <AssistAccordion :id="'_credit_auth_cc_'+idAssist" ico="fa fa-credit-card" v-if="assistances.is_asigne==1 && permission.hidden_tab_voucher && assistances.paymentCC=='Y'">
                    <template slot="title">{{$t('assistance.creditAuthorization')|upper}}</template>
                    <template slot="title-left">
                        <a href="#" @click="donwload(assistances.codeAssist,'CCAUTORIZATION')">
                            <i class="fa fa-lg fa-cloud-download-alt"></i>
                        </a>
                    
                    </template>
                    <template slot="body"> 
                        <iframe class="preview"
                                :src="baseUrlApi()+'provider-files/CCAUTORIZATION/'+assistances.codeAssist"
                        ></iframe>
                    </template>
                </AssistAccordion>
            </div>
        </div>
    </div>
</template>
<script>


import Flag from "../Element/Flag.vue";
import AssistAccordion from "./AssistAccordion.vue";
import AssistAccordionDetaill from "./AssistAccordionDetaill.vue";
import popOver from "../Element/pop-over.vue";
import progressBar from "./progressBar.vue";

export default {
    components: {
        Flag,
        AssistAccordion,
        AssistAccordionDetaill,
        popOver,
        progressBar
    },
    props: ["id-assist"],
    data: function() {
        return {
            assist: this.idAssist,
            assistances: [],
            motivo:'',
            notificationApprove: false,
            notificationFinish: false,
            notificationRejected: false,
            showLoader: false,
            motivo_finalizado:'',
            benefit: [],
            permission: {
                hidden_tab_voucher: this.middleware("hidden_tab_voucher", "read"),
                triage: this.middleware("triage", "read"),
                facial_scan: this.middleware("facial_scan", "read"),
                show_provider: this.middleware("show_provider", "read")
            }
        };
    },
    methods: {
        getAssistanceDetail: function() {
            this.showLoader = true;
            this.axios
                .post("getAssistanceDetail", {
                    idAssist: this.idAssist,
                    rand: Math.random()
                })
                .then(response => {
                    this.showLoader = false;
                    this.assistances = response.data.RESPONSE;
                });
        },
        aprobar: function() {
            this.showLoader = true;
            this.axios
                .post("apruebaProveedor", {
                    idAssist: this.idAssist
                })
                .then(() => {
                    this.showLoader = false;
                    this.notificationApprove= true;
                    this.assistances.approved_status_user=2;
                });

        },
        finalizar: function() {
            this.showLoader = true;
            this.axios
                .post("finalizaProveedor", {
                    idAssist: this.idAssist,
                    motivo: this.motivo_finalizado
                })
                .then(() => {
                    this.showLoader = false;
                    this.notificationFinish = true;
                    this.assistances.approved_status_user=3;
                });
        },
        rechazar: function() {
            this.showLoader = true;
            this.axios
                .post("rechazadoProveedor", {
                    idAssist: this.idAssist,
                    motivo: this.motivo
                })
                .then(() => {
                    this.showLoader = false;
                    this.notificationRejected = true,
                    this.assistances.approved_status_user=4;
                });
        },
        donwload: function (codigoAsssit,typeFile) {
            let name =typeFile+'_'+codigoAsssit+'.pdf';
            this.$validator.validateAll().then(result => {
                if(result){
                    this.showLoader = true;
                    this.axios
                        .post('downloadPDF',{
                            url:this.baseUrlApi()+'provider-files/'+typeFile+'/'+codigoAsssit,
                            name:name
                        },{responseType: "blob"})
                        .then(response => {
                            window.console.log(response.headers)
                            const url = window.URL.createObjectURL(
                                new Blob([response.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                                "download", name
                            );
                            document.body.appendChild(link);
                            link.click();
                            this.showLoader = false;
                        });
                }
            });
        }
    },

    mounted() {
        this.axios
            .post("GetBenefitToCase", {
                idAssist: this.idAssist
            })
            .then(response => {
                this.benefit = response.data.RESPONSE;
                window.$(this.$el)
                    .find('[data-toggle="popover"]')
                    .popover({
                        html: true,
                        trigger: "focus",
                        title: function() {
                            return window.$(this).attr("title");
                        },
                        content: function() {
                            return window.$(this)
                                .find(".popover-content")
                                .html();
                        }
                    });
            });
        this.getAssistanceDetail();
    }
};
</script>
