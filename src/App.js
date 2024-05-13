import { createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import WatchPage from "./components/WatchPage";
import MainContainer from "./components/MainContainer";
import { RouterProvider } from "react-router-dom";
import Demo from "./components/Demo";
import Demo2 from "./components/Demo2";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "demo",
        element: <>
          <Demo />
          <Demo2 />
        </>,
      },
    ],
  },
]);


function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;



/*
* Head
* Body
*  Sidebar
*    MenuItems
*  MainContainer
*    ButtonsList
*    VideoContainer
*      VideoCard
*/