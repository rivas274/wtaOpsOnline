<template>
  <div class="m-content container-fluid">
    <div class="col-xl-10">
      <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text">Asistencias Recientes</h3>
            </div>
          </div>
          <div class="m-portlet__head-tools">
            <ul class="m-portlet__nav">
              <li class="m-portlet__nav-item">
                <div
                  class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push"
                  m-dropdown-toggle="hover"
                  aria-expanded="true"
                >
                  <a
                    href="#"
                    class="m-portlet__nav-link btn btn-lg btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill m-dropdown__toggle"
                  >
                    <i class="la la-ellipsis-h m--font-brand"></i>
                  </a>
                  <div class="m-dropdown__wrapper" style="z-index: 101;">
                    <span
                      class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"
                      style="left: auto; right: 21.5px;"
                    ></span>
                    <div class="m-dropdown__inner">
                      <div class="m-dropdown__body">
                        <div class="m-dropdown__content">
                          <ul class="m-nav">
                            <li class="m-nav__section m-nav__section--first">
                              <span class="m-nav__section-text">Quick Actions</span>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-share"></i>
                                <span class="m-nav__link-text">Create Post</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-chat-1"></i>
                                <span class="m-nav__link-text">Send Messages</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-multimedia-2"></i>
                                <span class="m-nav__link-text">Upload File</span>
                              </a>
                            </li>
                            <li class="m-nav__section">
                              <span class="m-nav__section-text">Useful Links</span>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-info"></i>
                                <span class="m-nav__link-text">FAQ</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                <span class="m-nav__link-text">Support</span>
                              </a>
                            </li>
                            <li class="m-nav__separator m-nav__separator--fit m--hide"></li>
                            <li class="m-nav__item m--hide">
                              <a
                                href="#"
                                class="btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm"
                              >Submit</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="m-portlet__body">
          <!--begin: Search Form -->
          <div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
            <div class="row align-items-center">
              <div class="col-xl-8 order-2 order-xl-1">
                <div class="form-group m-form__group row align-items-center">
                  <div class="col-md-4">
                    <div class="m-form__group m-form__group--inline">
                      <div class="m-form__label">
                        <label>Status:</label>
                      </div>
                      <div class="m-form__control">
                        <div class="dropdown bootstrap-select form-control m-bootstrap-select">
                          <select
                            class="form-control m-bootstrap-select"
                            id="m_form_status"
                            tabindex="-98"
                          >
                            <option value>All</option>
                            <option value="1">Pending</option>
                            <option value="2">Delivered</option>
                            <option value="3">Canceled</option>
                          </select>
                          <button
                            type="button"
                            class="btn dropdown-toggle bs-placeholder btn-light"
                            data-toggle="dropdown"
                            role="button"
                            data-id="m_form_status"
                            title="All"
                          >
                            <div class="filter-option">
                              <div class="filter-option-inner">All</div>
                            </div>&nbsp;
                            <span class="bs-caret">
                              <span class="caret"></span>
                            </span>
                          </button>
                          <div class="dropdown-menu" role="combobox">
                            <div
                              class="inner show"
                              role="listbox"
                              aria-expanded="false"
                              tabindex="-1"
                            >
                              <ul class="dropdown-menu inner show"></ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-md-none m--margin-bottom-10"></div>
                  </div>
                  <div class="col-md-4">
                    <div class="m-form__group m-form__group--inline">
                      <div class="m-form__label">
                        <label class="m-label m-label--single">Type:</label>
                      </div>
                      <div class="m-form__control">
                        <div class="dropdown bootstrap-select form-control m-bootstrap-select">
                          <select
                            class="form-control m-bootstrap-select"
                            id="m_form_type"
                            tabindex="-98"
                          >
                            <option value>All</option>
                            <option value="1">Online</option>
                            <option value="2">Retail</option>
                            <option value="3">Direct</option>
                          </select>
                          <button
                            type="button"
                            class="btn dropdown-toggle bs-placeholder btn-light"
                            data-toggle="dropdown"
                            role="button"
                            data-id="m_form_type"
                            title="All"
                          >
                            <div class="filter-option">
                              <div class="filter-option-inner">All</div>
                            </div>&nbsp;
                            <span class="bs-caret">
                              <span class="caret"></span>
                            </span>
                          </button>
                          <div class="dropdown-menu" role="combobox">
                            <div
                              class="inner show"
                              role="listbox"
                              aria-expanded="false"
                              tabindex="-1"
                            >
                              <ul class="dropdown-menu inner show"></ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-md-none m--margin-bottom-10"></div>
                  </div>
                  <div class="col-md-4">
                    <div class="m-input-icon m-input-icon--left">
                      <input
                        type="text"
                        class="form-control m-input"
                        placeholder="Search..."
                        id="generalSearch"
                      >
                      <span class="m-input-icon__icon m-input-icon__icon--left">
                        <span>
                          <i class="la la-search"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end: Search Form -->
          <!--begin: Datatable -->
          <div class="m-datatable m-datatable--default m-datatable--brand m-datatable--loaded">
            <table
              class="m-datatable__table"
              id="html_table"
              width="100%"
              style="display: block; min-height: 300px; position: static; zoom: 1; overflow-x: auto;"
            >
              <thead class="m-datatable__head">
                <tr class="m-datatable__row" style="left: 0px;">
                  <th title="Field #1" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Numero de Caso</span>
                  </th>
                  <th title="Field #2" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Compania</span>
                  </th>
                  <th title="Field #3" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Voucher</span>
                  </th>
                  <th title="Field #4" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Pasajeros</span>
                  </th>
                  <th title="Field #5" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Sintomas</span>
                  </th>
                  <th title="Field #6" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Tipo de Caso</span>
                  </th>
                  <th title="Field #7" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Fecha Evento</span>
                  </th>
                  <th title="Field #8" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Fecha Apertura</span>
                  </th>
                  <th title="Field #9" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Pais</span>
                  </th>
                  <th title="Field #10" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">Tipo</span>
                  </th>
                </tr>
              </thead>
              <tbody class="m-datatable__body" style>
                <tr data-row="0" class="m-datatable__row" style="left: 0px;" v-for="(value, key) in resp.results">
                  <td data-field="Order ID" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.codeAssist}}</span>
                  </td>
                  <td data-field="Owner" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.clientName}}</span>
                  </td>
                  <td data-field="Contact" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.codigo}}</span>
                  </td>
                  <td data-field="Car Make" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.fisrtName}}</span>
                  </td>
                  <td data-field="Car Model" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.symptom}}</span>
                  </td>
                  <td data-field="Color" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.descCaseType}}</span>
                  </td>
                  <td data-field="Deposit Paid" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.reportedDate.date}}</span>
                  </td>
                  <td data-field="Order Date" class="m-datatable__cell">
                    <span style="width: 110px;">{{value.registeredDate.date}}</span>
                  </td>
                  <td data-field="Status" class="m-datatable__cell">
                    <span style="width: 110px;">
                      <img :src="'https://wtaops.com/app/images/flags_iso/svg/'+value.isoCountry.toLowerCase()+'.svg'" width="40px"/>
                      <!--<span class="m-badge m-badge--info m-badge--wide">Info</span>-->
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
            <div class="m-datatable__pager m-datatable--paging-loaded clearfix">
              <ul class="m-datatable__pager-nav">
                <li>
                  <a
                    title="First"
                    class="m-datatable__pager-link m-datatable__pager-link--first m-datatable__pager-link--disabled"
                    data-page="1"
                    disabled="disabled"
                  >
                    <i class="la la-angle-double-left"></i>
                  </a>
                </li>
                <li>
                  <a
                    title="Previous"
                    class="m-datatable__pager-link m-datatable__pager-link--prev m-datatable__pager-link--disabled"
                    data-page="1"
                    disabled="disabled"
                  >
                    <i class="la la-angle-left"></i>
                  </a>
                </li>
                <li style="display: none;">
                  <a
                    title="More pages"
                    class="m-datatable__pager-link m-datatable__pager-link--more-prev"
                    data-page="1"
                  >
                    <i class="la la-ellipsis-h"></i>
                  </a>
                </li>
                <li style="display: none;">
                  <input type="text" class="m-pager-input form-control" title="Page number">
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number m-datatable__pager-link--active"
                    data-page="1"
                    title="1"
                  >1</a>
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number"
                    data-page="2"
                    title="2"
                  >2</a>
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number"
                    data-page="3"
                    title="3"
                  >3</a>
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number"
                    data-page="4"
                    title="4"
                  >4</a>
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number"
                    data-page="5"
                    title="5"
                  >5</a>
                </li>
                <li>
                  <a
                    class="m-datatable__pager-link m-datatable__pager-link-number"
                    data-page="6"
                    title="6"
                  >6</a>
                </li>
                <li>
                  <a
                    title="More pages"
                    class="m-datatable__pager-link m-datatable__pager-link--more-next"
                    data-page="7"
                  >
                    <i class="la la-ellipsis-h"></i>
                  </a>
                </li>
                <li>
                  <a
                    title="Next"
                    class="m-datatable__pager-link m-datatable__pager-link--next"
                    data-page="2"
                  >
                    <i class="la la-angle-right"></i>
                  </a>
                </li>
                <li>
                  <a
                    title="Last"
                    class="m-datatable__pager-link m-datatable__pager-link--last"
                    data-page="15"
                  >
                    <i class="la la-angle-double-right"></i>
                  </a>
                </li>
              </ul>
              <div class="m-datatable__pager-info">
                <div class="dropdown bootstrap-select m-datatable__pager-size" style="width: 70px;">
                  <select
                    class="selectpicker m-datatable__pager-size"
                    title="Select page size"
                    data-width="70px"
                    data-selected="10"
                    tabindex="-98"
                  >
                    <option class="bs-title-option" value>Select page size</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <button
                    type="button"
                    class="btn dropdown-toggle btn-light"
                    data-toggle="dropdown"
                    role="button"
                    title="Select page size"
                  >
                    <div class="filter-option">
                      <div class="filter-option-inner">10</div>
                    </div>&nbsp;
                    <span class="bs-caret">
                      <span class="caret"></span>
                    </span>
                  </button>
                  <div class="dropdown-menu" role="combobox">
                    <div class="inner show" role="listbox" aria-expanded="false" tabindex="-1">
                      <ul class="dropdown-menu inner show"></ul>
                    </div>
                  </div>
                </div>
                <span class="m-datatable__pager-detail">Displaying 1 - 10 of 143 records</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./Table.js"></script>