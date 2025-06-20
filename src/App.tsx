import "./index.css";

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { selectApp } from "@/store/selectors/appSelectors";
import { toggleDarkMode } from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/utils";

function App() {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(selectApp);

  return (
    <div>
      <Button onClick={() => dispatch(toggleDarkMode())}>
        {darkMode ? "Dark" : "Light"}
      </Button>

      {/* tabs */}
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
