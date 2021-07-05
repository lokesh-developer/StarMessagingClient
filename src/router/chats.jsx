import loadable from "@loadable/component";
import { Route, Switch } from "react-router";

export const Chats = () => {
  const Chat = loadable(() => import("../components").then((mod) => mod.Chat));
  const UserProfile = loadable(() =>
    import("../components").then((mod) => mod.UserProfile)
  );

  return (
    <Switch>
      <Route exact path="/chats/users/:userId">
        <UserProfile />
      </Route>
      <Route exact path="/chats/:conversationId">
        <Chat />
      </Route>
      <Route exact path="/chats/saved-messages/:userId">
        <Chat />
      </Route>
    </Switch>
  );
};
