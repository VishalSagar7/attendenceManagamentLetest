import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './studentListSlice.js';
import teacherSlice from './teacherSlice.js';
import studentListForGettingAttendence from './studentListForGettingAttendence.js'
import studentInfoSlice from './studentSlice.js';
import individualStudentDetailSlice from './individualStudentDetailsSlice.js'
import defaulterSlice from './defaultersSlice.js';
import selectedTabSlice from './selectedTab.js'
import classAnnouncements from './classAnnouncements.js';
import classSubjectSlice from './classSubjectSlice.js'
import schoolInfo from './scoolInfo.js';


const store = configureStore({
    reducer: {
        studentsList: studentSlice,
        teacherInfo: teacherSlice,
        studentListForGettingAttendence: studentListForGettingAttendence,
        studentInfo: studentInfoSlice,
        individualStudentDetail: individualStudentDetailSlice,
        defaulterList: defaulterSlice,
        selectedTab: selectedTabSlice,
        classAnnouncements: classAnnouncements,
        classSubjects: classSubjectSlice,
        schoolInfo : schoolInfo
    }
});


export default store;