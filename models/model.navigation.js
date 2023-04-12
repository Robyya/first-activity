class RouteModel {
  constructor({ text = "", name = "", icon = "", params = {} } = {}) {
    this.text = text;
    this.name = name;
    this.params = params;
    this.icon = icon;
  }
}

export default class NavigationModel {
  constructor({ role = "" } = {}) {
    this.role = role;
    this.routes = [
      new RouteModel({ text: "home", name: "home", icon: "mdi-home" })
    ]
  }
}
