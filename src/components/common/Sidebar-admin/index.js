import React from "react";
import Admin from "../../../assets/img/Admin.png";
import active from "../../../assets/img/active.png";
import { RiDashboardLine } from "react-icons/ri";

import { FiHome } from "react-icons/fi";
import { AiOutlineDollar } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { RiInformationLine } from "react-icons/ri";

import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import CebEngineerDetails1 from "../../../views/Admin/CebEngineerDetails1";
import CebEngineerDetails2 from "../../../views/Admin/CebEngineerDetails2";
import AddNewCebEngineer from "../../../views/Admin/AddNewCebEngineer";
import AdminUserProfile from "../../../views/Admin/AdminUserProfile";
import UnitChargesAdminHome from "../../../views/Admin/UnitChargesAdminHome";
import AdminUnitCharges60plus from "../../../views/Admin/AdminUnitCharges60plus";
import AdminUnitCharges0to60 from "../../../views/Admin/AdminUnitCharges0to60";
import AdminUnitChargesToU from "../../../views/Admin/AdminUnitChargesToU";
import DashboardAdmin from "../../../views/Admin/DashboardAdmin";
import ManageCEBEngineerHome from "../../../views/Admin/ManageCEBEngineerHome";
import InformationTable from "../../../views/InformationTable";

import "../../../assets/css/sidebar-admin.css";

import {
  SideNav,
  UlList,
  List,
  LinkList,
  UserProfile,
  UserName,
  UlDetailList,
  NameList,
  ActiveIcon,
} from "./SidebarElement";

const SidebarAdmin = ({ show }) => {
  return (
    <Router>
      <div className="sidebar-main">
        <div className="sidebar-left">
          <SideNav className={show ? "sidenav active " : "sidenav"}>
            <UserName>
              <UserProfile src={Admin} alt="Admin"></UserProfile>

              <UlDetailList>
                <NameList>{document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).name}</NameList>
                <NameList className="role">Administrator</NameList>
                <NameList>
                  <ActiveIcon src={active}></ActiveIcon>&nbsp;&nbsp;Active
                </NameList>
              </UlDetailList>
            </UserName>
            <UlList>
              <List>
                <LinkList to="/dashboard-admin">
                  <RiDashboardLine />
                  &nbsp;&nbsp;&nbsp;Dashboard
                </LinkList>
              </List>

              <List>
                <LinkList to="/admin-unit-charges">
                  <AiOutlineDollar />
                  &nbsp;&nbsp;&nbsp;Unit Charges
                </LinkList>
              </List>

              <List>
                <LinkList to="/manage-cebengineer">
                  <FaUserTie />
                  &nbsp;&nbsp;&nbsp;Manage CEB Engineer
                </LinkList>
              </List>

              <List>
                <LinkList to="/admin-userprofile">
                  <BiUserCircle />
                  &nbsp;&nbsp;&nbsp;User Profile
                </LinkList>
              </List>

              <List>
                <LinkList to="/information">
                  <RiInformationLine />
                  &nbsp;&nbsp;&nbsp; Information
                </LinkList>
              </List>
            </UlList>
          </SideNav>
        </div>
        {/* <Route
          path="/manage-cebengineer"
          exact={true}
          component={ManageCebEngineer}
        />
        <Route
          path="/addnewcebengineer"
          exact={true}
          component={AddNewCebEngineer}
        /> */}

        <div claasName="page-load">
          <div className="load-area">
            <Route
              path="/manage-cebengineer"
              exact={true}
              component={ManageCEBEngineerHome}
            />
            <Route
              path="/cebengineer-details"
              exact={true}
              component={CebEngineerDetails1}
            />
            {/* <Route
              path="/cebengineer-details2"
              exact={true}
              component={CebEngineerDetails2}
            /> */}
            <Route
              path="/addnewcebengineer"
              exact={true}
              component={AddNewCebEngineer}
            />
            <Route
              path="/admin-userprofile"
              exact={true}
              component={AdminUserProfile}
            />
            <Route
              path="/admin-unit-charges"
              exact={true}
              component={UnitChargesAdminHome}
            />
            <Route
              path="/admin-unitcharges-60plus"
              exact={true}
              component={AdminUnitCharges60plus}
            />
            <Route
              path="/admin-unitcharges-0to60"
              exact={true}
              component={AdminUnitCharges0to60}
            />
            <Route
              path="/dashboard-admin"
              exact={true}
              component={DashboardAdmin}
            />
            <Route
              path="/admin-unitcharges-ToU"
              exact={true}
              component={AdminUnitChargesToU}
            />
            <Route
              path="/information"
              exact={true}
              component={InformationTable}
            />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default SidebarAdmin;
