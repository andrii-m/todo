<template>
  <div class="user" v-click-outside="closeUserDD" @click.prevent="toggleUserDD">
    <button
      type="button"
      class="user-btn"
      :class="{ 'user-btn--active': isOpenUserDD }"
    >
      <figure
        v-if="user"
        class="user-btn__ava"
        :class="{ 'user-btn__ava--default': !user.photo }"
      >
        <img
          :src="user.photo || require('@/assets/images/no-ava.svg')"
          alt=""
        />
      </figure>

      <p class="user-btn__name">{{ user.name }}</p>

      <span class="user-btn__arrow"></span>
    </button>

    <transition name="fade">
      <div v-if="isOpenUserDD" class="user-dd">
        <AppIcon componentName="TriangleSimpleIcon" class="user-dd__arrow" />
        <div class="user-info">
          <p v-for="item in userInfo" :key="item" class="user-info__item">
            {{ item }}
          </p>
        </div>
        <button class="user-dd__item" @click.prevent="onLogout">
          <AppIcon componentName="LogoutIcon" />
          Log Out
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeaderUser",

  data() {
    return {
      isOpenUserDD: false,
    };
  },

  computed: {
    userInfo() {
      return [this.user.email, this.user.phone, this.user.website];
    },
    ...mapGetters({
      user: "auth/getUserData",
    }),
  },

  methods: {
    toggleUserDD() {
      this.isOpenUserDD = !this.isOpenUserDD;
    },

    closeUserDD() {
      this.isOpenUserDD = false;
    },

    async onLogout() {
      this.logout();
    },

    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  .user-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &__ava {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }

      &--default {
        img {
          object-fit: contain;
          object-position: center bottom;
        }
      }
    }

    &__name {
      font-size: 14px;
      line-height: 21px;
      margin-right: 8px;
      transition: color 0.3s ease;
      color: $body-color;
    }

    &__arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #cbced7;
      transition: border, transform, 0.3s ease;
    }

    &:hover {
      .user-btn__name {
        color: $primary;
      }

      .user-btn__arrow {
        border-top: 6px solid $primary;
      }
    }

    &--active {
      .user-btn__name {
        color: $primary;
      }

      .user-btn__arrow {
        transform: rotate(180deg);
        border-top: 6px solid $primary;
      }
    }
  }

  .user-info {
    margin-bottom: 15px;
  }

  .user-info__item {
    font-size: 14px;
    color: #fff;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  ::v-deep .user-dd {
    position: absolute;
    width: 100%;
    top: 100%;
    right: 0;
    background-color: $primary;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &__arrow {
      width: 24px;
      height: 18px;
      fill: $primary;
      position: absolute;
      right: 10px;
      top: 0;
      transform: translateY(-50%);
    }

    &__item {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
        padding-top: 15px;
        border-top: 1px solid #5782f1;
      }

      svg {
        width: 20px;
        height: 20px;
        fill: #fff;
        margin-right: 8px;
      }
    }
  }
}
</style>
