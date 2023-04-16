import AdminPage from "../features/Admin/AdminPage";
import CourseDetail from "../features/Homepage/Components/CourseList/Components/CourseDetail";
import CourseList from "../features/Homepage/Components/CourseList/Components/CourseList";
import CourseSearch from "../features/Homepage/Components/CourseList/Components/CourseSearch";
import Homepage from "../features/Homepage/Homepage";
import UserProfile from "../features/User/UserProfile";
import UserReg from "../features/User/UserReg";


const regularRoutes = [
    { path: "/", component: Homepage },
    {path:"/courses/:listId", component: CourseList},
    {path:"/course-search/:keyword", component:CourseSearch},
    {path:"/course/:courseId", component: CourseDetail},
    
    {path:"/user-profile/", component: UserProfile},
    {path:"/user-registration/", component: UserReg},
  ];

export {regularRoutes}


const adminRoutes = [
    {path:"/admin/", component: AdminPage}, 
];

export {adminRoutes}

  