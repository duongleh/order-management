<template>
  <div>
    <div class="row">
      <div class="col-3 justify-content-start">
        <div class="card">
          <img
            src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            class="card-img-top"
            alt="avatar"
          />
          <div class="card-body">
            <h3>Quản lý đơn hàng</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Đơn hàng thành công</li>
              <li class="list-group-item">Đơn hàng bị hủy</li>
              <li class="list-group-item">Đơn hàng đã tiếp nhận</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-9 justify-content-end">
        <h3>Danh sách đơn hàng</h3>
        <div class="row border border-primary">
          <div class="col col-sm-2">Mã đơn hàng</div>
          <div class="col">Ngày giao</div>
          <div class="col">Tên sản phẩm</div>
          <div class="col">Tổng tiền</div>
          <div class="col">Trạng thái</div>
        </div>
        <div
          class="row border bg-light align-items-center"
          v-for="order in orders"
          v-bind:key="order.id"
        >
          <div class="col col-sm-2">{{ order.id }}</div>
          <div class="col">{{ order.order_date }}</div>
          <div class="col">{{ order.order_name }}</div>
          <div class="col">{{ order.order_price }}</div>
          <div class="col">{{ order.order_status }}</div>
        </div>
        <nav>
          <ul class="pagination">
            <li v-bind:class="[{disable: !pagination.prev_page_url}]" class="page-item">
              <a class="page-link" href="#" @click="fetchOrders(pagination.prev_page_url)">Previous</a>
            </li>
            <li v-bind:class="[{disable: !pagination.next_page_url}]" class="page-item">
              <a class="page-link" href="#" @click="fetchOrders(pagination.next_page_url)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      order: {
        id: "",
        order_name: "",
        order_price: "",
        order_status: "",
        order_date: ""
      },
      order_id: "",
      pagination: {},
      edit: false
    };
  },

  created() {
    this.fetchOrders();
  },

  methods: {
    fetchOrders(page_url) {
      let vm = this;
      page_url = page_url || "api/orders";
      fetch(page_url)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.orders = res.data;
          vm.makePagination(res.meta, res.links);
        })
        .catch(err => console.log(err));
    },

    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        prev_page_url: links.prev,
        next_page_url: links.next
      };
      this.pagination = pagination;
    }
  }
};
</script>
