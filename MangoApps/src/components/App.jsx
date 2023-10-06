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
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { useEffect } from "react";
import { app } from "@microsoft/teams-js";

// const express = require('express');
// const app = express();

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint,
    clientId: config.clientId,
  });
  let isMobile = navigator?.userAgentData?.mobile;
  let session_id = "";
  useEffect(() => {
    if (typeof isMobile === "undefined") {
      window.open("mangoapps://", '_blank');
    } else {
      // let domain, username, password;
      // domain = "https://lmsteam.mangopulse.com/";
      // username = "admin@lmsteam.com";
      // password = "password";
      // const ms_request = {
      //   ms_request: {
      //     user: {
      //       api_key: "MangoMessenger",
      //       username,
      //       password: window.btoa(unescape(encodeURIComponent(password))),
      //       client_id: "cp",
      //       device_id: "123456798",
      //       os_name: "Windows",
      //       os_version: "10.14",
      //       current_version: "17.2.2"
      //     }
      //   }
      // };

      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(ms_request)
      // };

      // const u = `${domain}/api/login.json`;

      // fetch(u, requestOptions)
      //   .then(resp => {
      //     if (resp.error) return Promise.reject(resp);
      //     console.log("$$$$$ RESPONSE = " + JSON.stringify(resp));

      //     const headers = new Headers({
      //       Accept: 'application/json',
      //       Cookie: '_felix_session_id=' + resp.user.session_id
      //     });

      //     const requestOptions1 = {
      //       method: 'POST',
      //       headers: headers,
      //       body: ''
      //     };
      //     const u1 = `${domain}/api/post_login.json`;
      //     fetch(u1, requestOptions1);
      //   })
      //   .catch(error => {
      //   });
    }
  }, [])


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
            src="https://devmango1.mangopulse.com/mangoapps_embed.html?view_type=enable_all"
            width="100%" height="100%"></iframe>))}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}