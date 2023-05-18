import { alphanumeric } from "@daladaia/logic/str";

interface UserFc {
  id: string;
  name: string;
}

export default class User implements UserFc {
  id = "";
  name = "";
  constructor(user?: Partial<UserFc>) {
    const u = {
      ...this,
      id: `${Date.now()}-user`,
      ...user,
    };
    u.name = alphanumeric(u.name);
    return u;
  }
}
