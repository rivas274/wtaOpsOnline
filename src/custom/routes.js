import Login from '../components/Login/Login';
import MyAcount from '../components/Login/MyAcount';
import http404 from '../components/http404';
import MainAsistencia from '../components/Assists/MainAsistencia';
import uploadDocument from '../components/DocumentsClient/MainDocument';
import sharedDocument from '../components/DocumentsClientShared/MainDocument';
import VoucherCase from '../components/VoucherCase/dasboard';
import Refunds from '../components/Refunds/dasboard';
import ViewDocuments from '../components/Refunds/ViewDocuments';
import RePricing from '../components/RePricing/dasboard';
import Invoice from '../components/invoice/dasboard';
import AssistanceBills from '../components/AssistanceBills/dasboard';
import ReportsClient from '../components/ReportsClient/dasboard';

export default [
    {
        name: 'dasboard',
        path: '/dasboard',
        component: MainAsistencia,
    },
    {
        name: 'upload_document',
        path: '/upload_document',
        component: uploadDocument,
    },
    {
        name: 'shared_document',
        path: '/shared_document',
        component: sharedDocument,
    },
    {
        name: 'VoucherCase',
        path: '/voucher_case',
        component: VoucherCase,
    },
    {
        name: 'RePricing',
        path: '/re-pricing',
        component: RePricing,
    },
    {
        name: 'Invoice',
        path: '/invoice',
        component: Invoice,
    },
    {
        name: 'reports-client',
        path: '/reports-client',
        component: ReportsClient,
    },
    {
        name: 'Login',
        path: '/',
        component: Login,
        meta: {
            isPublic: true
        }
    },
    {
        name: 'MyAcount',
        path: '/MyAcount',
        component: MyAcount,
    },
    {
        path: '/:lang/refunds/:code',
        redirect: '/:lang/reimbursement/:code',
    },
    {
        path: '/refunds/:code',
        redirect: '/en/reimbursement/:code',
    },
    {
        path: '/reimbursement/:code',
        redirect: '/en/reimbursement/:code',
    },
    {
        name: 'Refunds',
        path: '/:lang/reimbursement/:code',
        component: Refunds,
        meta: {
            isPublic: true
        }
    },
    {
        name: 'ViewDocuments',
        path: '/:lang/reimbursement/:code/view-documents',
        component: ViewDocuments,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/AssistanceBills/:code/:providerId',
        redirect: '/en/AssistanceBills/:code/:providerId',
    },
    {
        name: 'AssistanceBills',
        path: '/:lang/AssistanceBills/:code/:providerId',
        component: AssistanceBills,
        meta: {
            isPublic: true
        }
    },
    {
        path: "**",
        name: "http404",
        component: http404,
        meta: {
            isPublic: true
        }
    }
]