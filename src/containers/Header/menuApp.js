export const adminMenu = [
    {
        //quản lý người dùng
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud",
                link: "/system/user-manage",
            },

            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                //quản lý kế hoạch khám bệnh bác sĩ
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
        ],
    },
    {
        //quản lý phòng khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        //quản lý cẩm nang
        name: "menu.admin.handbook",
        menus: [
            {
                name: "menu.admin.manage-handbook",
                link: "/system/manage-handbook",
            },
        ],
    },
    {
        //quản lý thuốc
        name: "menu.admin.drug",
        menus: [
            {
                name: "menu.admin.manage-drug",
                link: "/system/manage-drug",
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: "menu.admin.manage-user",
        menus: [
            {
                //quản lý kế hoạch khám bệnh bác sĩ
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
            {
                //quản lý bệnh nhân khám bệnh bác sĩ
                name: "menu.doctor.manage-patient",
                link: "/doctor/manage-patient",
            },
            {
                //Thống kê hóa đơn khám bệnh của bác sỹ
                name: "menu.doctor.statistic-invoice",
                link: "/doctor/statistic-invoice",
            },
        ],
    },
];
