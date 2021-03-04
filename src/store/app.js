import {
    observable,
    action,
    computed
} from 'mobx'


class AppStore {
    @observable.shallow notify = { // 通知消息红点
        total: 0,
        cc_num: 0,
        pay_num: 0,
        verify_num: 0,
    }
}