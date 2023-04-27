// import { Route } from "react-router-dom";
import Login from "../Container/Login";
import ForgotPass from "../Container/ForgotPass";
import ResetPass from "../Container/ResetPass";
import Dashboard from "../Container/Dashboard";
import RouteRules from "./RouteRules";
import User from "../Container/UserProfile";
import Certificate from "../Container/Certificate/Certificate";
import Organization from "../Container/Organization/Organization";
import OrganizationEdit from "../Container/Organization/OrganizationEdit/OrganizationEdit";
import OrganizationView from "../Container/Organization/OrganizationView/OrganizationView";
import AddCertificate from "../Container/Certificate/AddCertificate/AddCertificate";
import PreviewCertificate from "../Container/Certificate/PreviewCertificate/PreviewCertificate";
import ManageRecipient from "../Container/Certificate/ManageRecipient/ManageRecipient";
import AddRecipient from "../Container/Certificate/ManageRecipient/AddRecipient";
import UpdateRecipient from "../Container/Certificate/ManageRecipient/UpdateRecipient";
import OrganizationAdd from "../Container/Organization/OrganizationAdd/OrganizationAdd";
import EditCertificate from "../Container/Certificate/AddCertificate/EditCertificate";
import UserLogin from "../Container/User/UserLogin";
import UserDashBoard from "../Container/User/UserDashBoard";
import UserView from "../Container/User/UserView";
import POC from "../Container/POC";
import ViewApproval from "../Container/Certificate/ViewApproval/ViewApproval";
import ViewRequest from "../Container/Certificate/ViewApproval/ViewRequest";
import Font from "../Container/FontMaster/Font";
import CreateFont from "../Container/FontMaster/CreateFont";
const RouteData = [
  // {
  //   path: RouteRules.loginPage,
  //   component: Login,
  //   auth: false,
  //   layout: null,
  //   type: "Admin",
  // },
  {
    path: RouteRules.loginPage,
    component: Login,
    auth: false,
    layout: null,
    type: "Admin",
  },
  {
    path: RouteRules.userLogin,
    component: UserLogin,
    auth: false,
    layout: null,
    type: "user",
  },
  {
    path: RouteRules.userDashBoard,
    component: UserDashBoard,
    name: "DashBoard",
    auth: true,
    layout: "/user",
    type: "user",
    isSideBar: true,
  },
  {
    path: RouteRules.userCertificate,
    component: UserView,
    name: "User View",
    auth: true,
    layout: "/user",
    type: "user",
    isSideBar: false,
  },
  {
    path: RouteRules.forgotPassword,
    component: ForgotPass,
    auth: false,
    layout: null,
    type: "Admin",
  },
  {
    path: RouteRules.resetPassword,
    component: ResetPass,
    auth: false,
    layout: null,
    type: "Admin",
  },
  {
    path: RouteRules.dashboard,
    component: Dashboard,
    name: "Dashboard",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-chart-pie-35",
    isSideBar: true,
    type: "Admin",
  },

  {
    path: RouteRules.fontCreate,
    component: CreateFont,
    name: "Create Font",
    auth: true,
    layout: "/admin",
    icon: "fa fa-font",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.poc,
    component: POC,
    name: "POC",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-chart-pie-35",
    isSideBar: false,
    type: "Admin",
  },

  {
    path: RouteRules.organization,
    component: Organization,
    name: "Organization",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-vector",
    isSideBar: true,
    type: "Admin",
  },
  {
    path: RouteRules.cretificates,
    component: Certificate,
    name: "Certificates",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-credit-card",
    isSideBar: true,
    type: "Admin",
  },
  {
    path: RouteRules.viewApproval,
    component: ViewApproval,
    name: "View Approval",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-credit-card",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.viewRequest,
    component: ViewRequest,
    name: "Certificates",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-credit-card",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.accountSetting,
    component: User,
    name: "Account Setting",
    auth: true,
    layout: "/admin",
    icon: "nc-icon nc-settings-90",
    isSideBar: true,
    type: "Admin",
  },
  {
    path: RouteRules.fontMaster,
    component: Font,
    name: "Font Master",
    auth: true,
    layout: "/admin",
    icon: "fa fa-font",
    isSideBar: true,
    type: "Admin",
  },
  {
    path: RouteRules.organizationEdit,
    component: OrganizationEdit,
    name: "Organization Edit",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },

  {
    path: RouteRules.organizationAdd,
    component: OrganizationAdd,
    name: "Organization Add",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.organizationView,
    component: OrganizationView,
    name: "Organization View",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.previewCertificate,
    component: PreviewCertificate,
    name: "Preview Certificate",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.manageRecipient,
    component: ManageRecipient,
    name: "Manage Recipient",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.addRecipient,
    component: AddRecipient,
    name: "Add Recipient",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.updateRecipient,
    component: UpdateRecipient,
    name: "Update Recipient",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.addCertificate,
    component: AddCertificate,
    name: "Add Certificate",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
  {
    path: RouteRules.editCertificate,
    component: EditCertificate,
    name: "Edit Certificate",
    auth: true,
    layout: "/admin",
    isSideBar: false,
    type: "Admin",
  },
];
export default RouteData;
