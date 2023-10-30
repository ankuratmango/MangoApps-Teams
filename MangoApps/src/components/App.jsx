// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useTeamsUserCredential, TeamsContextWithCredential
,useGraphWithCredential,useData } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { useEffect, useState } from "react";
import { app } from "@microsoft/teams-js";

// const express = require('express');
// const app = express();

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential} = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint,
    clientId: config.clientId,
  });
  let isMobile = navigator?.userAgentData?.mobile;
  let session_id = "";
  let [ssoToken, setSsoToken] = useState(null);
  useEffect(() => {
    if (typeof isMobile === "undefined") {
      window.open("mangoapps://", '_blank');
    } else {
      const checkSSOTimer = setInterval(() => {
        window.microsoftTeams.app.initialize().then(() => {
          // Call getAuthToken to get the SSO token
          window.microsoftTeams.authentication.getAuthToken({
              successCallback: (token) => {
                  // You have received an SSO token. You can use it for authentication and authorization.
                  console.log("SSO token:", token);
                  if(token){
                    clearInterval(checkSSOTimer);
                    setSsoToken(token);
                  }
              },
              failureCallback: (reason) => {
                  // Handle the error in case SSO fails.
                  console.error("SSO failed:", reason);
              },
          });
      });  
      }, 1000);
      
    }
  }, [])

  console.log("$$$$$$$$$$$$ SSO Token: ", ssoToken);
  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
              ? teamsHighContrastTheme
              : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (typeof isMobile === "undefined" ? (<ul>
            <li><a href="mangoapps://" target="_blank">OPEN MANGOAPPS MOBILE APP</a></li>
          </ul>) : (<iframe id="mangoIfram" style={{background: '#B8DDF1'}}
            src="https://outlookemails.engageexpress.com/mangoapps_embed.html?view_type=enable_all"
            width="100%" height="100%"></iframe>))}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}