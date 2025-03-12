<template>
  <div
    id="Sidebar"
    class="sidebar flex flex-col h-full bg-main rounded-[24px] py-6 px-2.5 w-full"
  >
    <div class="max-w-full w-full h-auto px-2.5 mb-10">
      <router-link to="">
        <img
          src="@/assets/images/logo-sidebar.png"
          alt=""
          class="max-w-full w-auto h-auto object-scale-down"
        />
      </router-link>
    </div>

    <ul class="sidebar-menu">
      <li
        class="sidebar-menu-item"
        v-for="(item, id) in refDataSidebar"
        :key="id"
      >
        <div class="sidebar-menu-parent">
          <router-link to="" class="parent-link">
            <img :src="item.icon" alt="" />
            {{ item.title }}
          </router-link>
          <button
            type="button"
            class="sidebar-nav-dropdown"
            @click="toggleDropdown(id)"
            v-if="item.nav"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              :class="{ 'rotate-in': isDropdownOpen(id) }"
              :style="{ transition: 'transform 0.2s' }"
            >
              <path
                d="M0.963891 1.16401C1.04747 1.0804 1.1467 1.01408 1.25591 0.968836C1.36512 0.923588 1.48218 0.900299 1.60039 0.900299C1.71861 0.900299 1.83566 0.923588 1.94487 0.968836C2.05409 1.01408 2.15332 1.0804 2.23689 1.16401L3.99989 2.92701L5.76389 1.16401C5.93378 1.00112 6.16071 0.911265 6.39605 0.913693C6.63139 0.916122 6.85642 1.01064 7.02291 1.177C7.1894 1.34336 7.28409 1.56831 7.28671 1.80365C7.28932 2.03899 7.19964 2.26599 7.03689 2.43601L4.63689 4.83601C4.55331 4.91961 4.45409 4.98593 4.34487 5.03118C4.23566 5.07643 4.11861 5.09971 4.00039 5.09971C3.88218 5.09971 3.76512 5.07643 3.65591 5.03118C3.5467 4.98593 3.44747 4.91961 3.36389 4.83601L0.963891 2.43601C0.79535 2.26726 0.700684 2.03851 0.700684 1.80001C0.700684 1.56151 0.79535 1.33276 0.963891 1.16401Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <!-- <transition
          name="slide"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        > -->
        <ul class="sidebar-menu-sub" v-show="isDropdownOpen(id)">
          <li v-for="(sub, idx) in item.submenu" :key="idx">
            <router-link to="" class="sub-link">
              <img :src="sub.icon" alt="" />
              {{ sub.title }}
            </router-link>
          </li>
        </ul>
        <!-- </transition> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MageDashboard from "@/assets/images/mage_dashboard.svg"
import FluentData from "@/assets/images/fluent_data-pie-24-regular.svg"
import FluentNote from "@/assets/images/fluent_note-24-regular.svg"
import Iconoir from "@/assets/images/iconoir_timer-off.svg"
import Proicons from "@/assets/images/proicons_timer.svg"
import LucideUserCog from "@/assets/images/lucide_user-cog.svg"
import LucideUserPen from "@/assets/images/lucide_user-pen.svg"
import IconamoonCategory from "@/assets/images/iconamoon_category-light.svg"
import TableUserScan from "@/assets/images/tabler_user-scan.svg"
import TickCircle from "@/assets/images/mdi_tick-circle-outline.svg"
import FluentHistory from "@/assets/images/fluent_history-24-filled.svg"
import EditNote from "@/assets/images/material-symbols_edit-note-outline-rounded.svg"

interface dataSidebarItem {
  icon: any
  title: string
  nav?: boolean
  submenu: dataSubmenu[]
}

interface dataSubmenu {
  icon: any
  title: string
}

const refDataSidebar: dataSidebarItem[] = ref([
  {
    icon: MageDashboard,
    title: "Dashboard",
    nav: false
  },
  {
    icon: FluentData,
    title: "Quản trị hệ thống",
    nav: true,
    submenu: [
      {
        icon: LucideUserCog,
        title: "Quản lý người dùng"
      },
      {
        icon: LucideUserPen,
        title: "Quản lý phân quyền"
      },
      {
        icon: IconamoonCategory,
        title: "Quản lý danh mục"
      }
    ]
  },
  {
    icon: FluentNote,
    title: "Tài liệu",
    nav: false
  },
  {
    icon: Iconoir,
    title: "Nghỉ phép",
    nav: true,
    submenu: [
      {
        icon: TableUserScan,
        title: "Thông tin nghỉ phép"
      },
      {
        icon: TickCircle,
        title: "Phê duyệt nghỉ phép"
      }
    ]
  },
  {
    icon: Proicons,
    title: "Chấm công",
    nav: true,
    submenu: [
      {
        icon: FluentHistory,
        title: "Lịch sử chấm công"
      },
      {
        icon: EditNote,
        title: "Giải trình chấm công"
      }
    ]
  }
])

// Mảng lưu trạng thái dropdown của từng item
const dropdownState = ref({})

const toggleDropdown = (idx) => {
  // Nếu dropdown đang mở, đóng lại, nếu chưa mở, mở dropdown đó
  dropdownState.value[idx] = !dropdownState.value[idx]
}

const isDropdownOpen = (idx) => {
  // Kiểm tra dropdown có đang mở không
  return dropdownState.value[idx]
}

// Các hàm để xử lý transition
const beforeEnter = (el) => {
  el.style.transition = "all 0.3s"
  el.style.height = "0"
}

const enter = (el, done) => {
  el.offsetHeight // force reflow
  el.style.transition = "all 0.3s"
  el.style.height = `${el.scrollHeight}px`
  done()
}

const leave = (el, done) => {
  el.style.transition = "all 0.3s"
  el.style.height = "0"
  done()
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 30px;
  left: 24px;
  bottom: 30px;
  z-index: 99;
  height: calc(100% - 60px);
  max-width: 240px;
  transition: all 0.2s;
}

.rotate-in {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.sidebar-menu {
  overflow: auto;

  &::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 2px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #ffffff3b;
  }

  &-item {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &-parent {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;

    @media (hover: hover) {
      &:hover {
        border-radius: 8px;
        background: #1b4dea;
      }
    }

    .parent-link {
      // flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .sidebar-nav-dropdown {
      cursor: pointer;
      margin-left: auto;
    }
  }

  &-sub {
    li {
      padding: 0 10px;

      &:not(:last-child) {
        .sub-link {
          border-bottom: 1px solid #004ea9;
        }
      }
    }

    .sub-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #c6c6c6;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 15px 0;

      @media (hover: hover) {
        &:hover {
          color: white;

          img {
            filter: brightness(9999);
          }
        }
      }
    }
  }
}
</style>
