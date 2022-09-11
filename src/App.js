import React, {useContext, Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./Store/AuthContext";
import Signup from "../src/Pages/Signup";
import MainHeader from "./Components/Layouts/MainHeader";
import Leftbar from "./Components/Layouts/Leftbar";
import video1 from "./Assests/videos/7-strategies-to-run-a-business.mp4";
import video2 from "./Assests/videos/10-tips-to-start-a-business.mp4";
import video3 from "./Assests/videos/how-to-build-a-business.mp4";
import video4 from "./Assests/videos/how-to-write-business-plan.mp4";
const SettingsPage = React.lazy(() => import("./Pages/SettingPage"));
const Help = React.lazy(() => import("./Pages/Help"));
const NotificationPage = React.lazy(() => import("./Pages/NotificationPage"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const CourseModule = React.lazy(() => import("./Pages/CourseModule"));
const ModuleDetail = React.lazy(() => import("./Components/CourseModule/ModuleDetail"));
const Resources = React.lazy(() => import("./Pages/Resources"));
const BusinessPlan = React.lazy(() => import("./Pages/BusinessPlan"));

const DUMMYMODULES = [
  {
    src : video1,
    title : "7 strategies to grow your successful business",
    id: "m1",
    percent: 0,
    description :
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu placerat orci. Aliquam vel nibh volutpat dolor consectetur pharetra in eu velit. Proin rhoncus risus eget facilisis dapibus.",
    buttontext: "Begin Modules"
  },
  {
    src: video2,
    title : "10 tips to start a business",
    id: "m2",
    percent: 0,
    description :
      "Maecenas quis magna a lacus fringilla suscipit. Mauris placerat lacinia nunc, id rhoncus leo blandit finibus. Pellentesque semper gravida commodo. Fusce a cursus eros. Nullam dapibus dui eget eros tincidunt efficitur. Maecenas in nibh turpis.",
    buttontext: "Begin Modules"
  },
  {
    src : video3,
    title : "How to build a business",
    id: "m3",
    percent: 0,
    description :
      "Etiam semper commodo arcu, ut iaculis erat vehicula eu. Nullam odio elit, gravida id ligula a, scelerisque vehicula risus. Praesent dignissim massa faucibus ullamcorper faucibus. Fusce rhoncus lorem ac elementum vestibulum.",
    buttontext: "Begin Modules"
    
  },
  {
    src : video4,
    title : "How to write business plan",
    id: "m4",
    percent: 0,
    description :
      " Vestibulum cursus posuere sodales. Nunc ac viverra mauris. Praesent dignissim ligula vel posuere molestie. Donec commodo massa quis imperdiet sagittis.",
    buttontext: "Begin Modules"
  }
]

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <React.Fragment>
        {isLoggedIn && <MainHeader />}
        {isLoggedIn && <Leftbar />}
        <Suspense fallback={<p className="text-center loading">Loading...</p>}>
          <Routes>
            {!isLoggedIn && <Route path="/" element={<Signup />} />}
            {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
            {isLoggedIn && <Route path="/" element={<Dashboard data={DUMMYMODULES} />} />}
            {isLoggedIn && <Route path="/dashboard" element={<Dashboard data={DUMMYMODULES} />} />}
            {isLoggedIn && <Route path="/course-modules" element={<CourseModule data={DUMMYMODULES} />} />}
            {isLoggedIn && <Route path="/module-detail/:moduleId" element={<ModuleDetail data={DUMMYMODULES} />} />}
            {isLoggedIn && <Route path="/resources" element={<Resources />} />}
            {isLoggedIn && <Route path="/business-plan" element={<BusinessPlan />} />}
            {isLoggedIn && <Route path="/settings" element={<SettingsPage />} />}
            {isLoggedIn && <Route path="/help" element={<Help />} />}
            {isLoggedIn && <Route path="/notification" element={<NotificationPage />} />}
            {!isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>
        </Suspense>
    </React.Fragment>
  );
}

export default App;
