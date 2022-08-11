import { observable } from "mobx";

const loadingStore = observable({
  loading: true,

  setLoading(data) {
    this.loading = data;
  },
});

export { loadingStore };
