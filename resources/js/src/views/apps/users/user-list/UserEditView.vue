<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} USER</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="Name" v-model="dataName" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <!-- STATUS -->
        <vs-select v-model="dataStatus" label="Status" class="mt-5 w-full" name="item-status" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.label" :text="item.label" v-for="item in status_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('status-group')">{{ errors.first('status-group') }}</span>

        <!-- EMAIL -->
        <vs-input label="Email1" v-model="dataEmail" class="mt-5 w-full" name="item-email" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-email')">{{ errors.first('item-email') }}</span>

        <!-- EMAIL2 -->
        <vs-input label="Email2" v-model="dataEmail2" class="mt-5 w-full" name="item-email2" />

         <!-- PHONE NUMBER -->
        <vs-input label="Phone Number1" v-model="dataPN1" class="mt-5 w-full" name="item-pn1" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-pn1')">{{ errors.first('item-pn1') }}</span>

         <!-- PHONE NUMBER -->
        <vs-input label="Phone Number2" v-model="dataPN2" class="mt-5 w-full" name="item-pn2" />

         <!-- PHONE NUMBER -->
        <vs-input label="Phone Number3" v-model="dataPN3" class="mt-5 w-full" name="item-pn3" />

        <!-- ROLE -->
        <vs-select v-model="dataRole" label="Role" class="mt-5 w-full" name="item-role" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.label" :text="item.label" v-for="item in role_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('item-role')">{{ errors.first('item-role') }}</span>


        <p class="mt-5 text-sm w-full">Change Password</p>
        <vx-input-group class="mb-base form-element-demo mt-5">
          <vs-input v-model="dataPwd" type="password"/>
          <template slot="append">
            <div class="append-text">
              <vs-button color="primary" type="filled" style="font-size: 8px;" @click="changePassword">Change Password</vs-button>
            </div>
          </template>
        </vx-input-group>
      </div>     
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      dataUserName: '',
      dataId: null,
      dataName: '',
      dataEmail: '',
      dataEmail2: '',
      dataPN1: '',
      dataPN2: '',
      dataPN3: '',
      dataStatus: null,
      dataRole: null,
      dataPwd: '',

      role_choices: [
        { label: 'Admin',  value: '1' },
        { label: 'User',  value: '2' },
      ],

      status_choices: [
        { label: 'Activate',  value: '1' },
        { label: 'Deactivate',  value: '2' },
      ],

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { id, user_name, email, email2, status, name, phone_number1, phone_number2, phone_number3, role_name } = JSON.parse(JSON.stringify(this.data))
        this.dataUserName = user_name
        this.dataId = id
        this.dataEmail = email
        this.dataEmail2 = email2
        this.dataName = name
        this.dataPN1 = phone_number1
        this.dataPN2 = phone_number2
        this.dataPN3 = phone_number3
        this.dataStatus = status
        this.dataRole = role_name
        this.initValues()
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      }
    },
    isFormValid () {
      return true;
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) 
        return

      this.dataId = null
      this.dataUserName = ''
      this.dataEmail = ''
      this.dataEmail2 = ''
      this.dataName = ''
      this.dataPN1 = ''
      this.dataPN2 = ''
      this.dataPN3 = ''
      this.dataStatus = ''
      this.role = ''
    },
    changePassword() {
      if (this.dataId === null)
        return

      const obj = {
        id: this.dataId,
        new_pwd: this.dataPwd,
      }

      this.$store.dispatch('users/changePassword', obj).catch(err => { console.error(err) })

      this.dataPwd = ''

      this.$emit('closeSidebar')
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            user_name: this.dataUserName,
            name: this.dataName,
            email: this.dataEmail,
            email2: this.dataEmail2, 
            phone_number1: this.dataPN1,
            phone_number2: this.dataPN2,
            phone_number3: this.dataPN3,
            status: this.dataStatus,
            role_name : this.dataRole
          }

          this.$store.dispatch('users/updateUser', obj).catch(err => { console.error(err) })

          this.$emit('closeSidebar')          
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
