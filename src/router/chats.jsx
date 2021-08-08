import loadable from "@loadable/component";
import { Route, Switch } from "react-router";
import { Chat } from "../components";

export const Chats = () => {
  const ChatRequests = loadable(() =>
    import("../components").then((mod) => mod.ChatRequests)
  );

  const UserProfile = loadable(() =>
    import("../components").then((mod) => mod.UserProfile)
  );

  return (
    <Switch>
      <Route exact path="/chats/users/:userId">
        <UserProfile />
      </Route>
      <Route exact path="/chats/conversations/:conversationId">
        <Chat />
      </Route>
      <Route exact path="/chats/chats-requests">
        <ChatRequests />
      </Route>
    </Switch>
  );
};
