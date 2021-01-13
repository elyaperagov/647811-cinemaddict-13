import Observer from "../helpers/observer.js";
import {FilterType} from "../constants.js";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    // debugger;
    return this._activeFilter;
  }
}
