export type Locale = "en" | "ar";

export const translations = {
    en: {
        wrong: "Something Went Wrong.",
        products: {
            "add-category": {
                post: {
                    "category-exist": "This Category Is Already Exist.",
                    success: "Category Was Successfully Created.",
                },
            },
            "add-company": {
                post: {
                    "company-exist": "This Company Is Already Exist",
                    success: "Company Was Successfully Created.",
                },
            },
            "add-product": {
                post: {
                    "product-exists": "These Products Are Already Exists",
                    success: "The Product Was Successfully Created.",
                },
            },
            "transfer-product": {
                put: {
                    "not-found": "The Product Was Not Found.",
                    "not-modified": "The Product Was Not Modified.",
                    "just-available": "Just Available",
                    "in-the": "In The",
                    market: "Market",
                    store: "Store",
                    success: "The Product Was Successfully Transfer.",
                },
            },
        },
        clients: {
            "show-clients": {
                put: {
                    success: "The Client Info Was Successfully Updated.",
                },
                delete: {
                    success: "The Client Was Successfully Deleted.",
                },
            },
            "add-client": {
                post: {
                    "already-exist": "This Client Is Already Exist.",
                    success: "The Client Was Successfully Created.",
                },
            },
            "new-statement": {
                post: {
                    "not-enough": "Not Enough",
                    success: "The Statement Was Successfully Created.",
                },
            },
            "restore-statement": {
                post: {
                    "missing-bill": "The Client Bill Not Found.",
                    "products-not-exist": "Some Products Count Is Not Exist In The Client Bill",
                    "locker-not-enough": "Locker Doesn't Exist The Restored Total Products Costs.",
                    success: "The Statement Was Successfully Restored.",
                },
                delete: {
                    "locker-not-enough": "Locker Doesn't Exist The Restored Total Products Costs.",
                    success: "The Statement Was Successfully Restored.",
                },
            },
        },
        finances: {
            locker: {
                post: {
                    "locker-not-enough": "The Locker Doesn't Exist",
                    success: "The Transaction Was Successfully Created",
                },
            },
        },
        organizations: {
            configs: {
                put: {
                    success: "The Organization Configs Was Successfully Updated.",
                },
            },
        },
        profile: {
            product: {
                get: {
                    "not-found": "This Product Was Not Found.",
                },
                put: {
                    success: "The Product Was Successfully Updated.",
                },
                delete: {
                    "not-deleted": "The Product Was Not Deleted.",
                    success: "The Product Was Successfully Deleted.",
                },
            },
            client: {
                put: {
                    "already-exist": "This Bill Is Already Completed.",
                    "salary-check": "The Payment Amount Is Greater Than The Pending Amount.",
                    success: "The Payment Was Successfully Done.",
                },
            },
            supplier: {
                put: {
                    "already-completed": "This Bill Is Already Completed.",
                    "not-enough": "This Payment Amount Doesn't Exist In The Locker Cash.",
                    "money-check": "The Payment Amount Is Greater Than The Pending Amount.",
                    success: "The Payment Was Successfully Done.",
                },
            },
        },
        suppliers: {
            "show-suppliers": {
                put: {
                    "missing-data": "Missing Data.",
                    success: "The Supplier Was Successfully Updated.",
                },
                delete: {
                    success: "The Supplier Was Successfully Deleted.",
                },
            },
            "show-bills": {
                delete: {
                    success: "The Supplier Bill Was Successfully Deleted.",
                },
            },
            "add-supplier": {
                put: {
                    "not-exist": "This Supplier / Product(s) Are Already Exists",
                    success: "The Supplier Was Successfully Added.",
                },
            },
            "new-statement": {
                post: {
                    "not-exist-cash-statement": "Locker Cash Doesn't Have This Statement Cost.",
                    "not-exist-visa-statement": "Visa Doesn't Have This Statement Cost.",
                    "not-exist-cash-paid": "Locker Cash Doesn't Have This Paid Cost.",
                    "not-exist-visa-paid": "Visa Doesn't Have This Paid Cost.",
                    "not-updated-products": "Some Products Was Not Updated.",
                    success: "The Statement Was Successfully Created.",
                },
            },
            "restore-statement": {
                post: {
                    "not-enough": "Not Enough",
                    success: "The Products Was Successfully Restored.",
                },
            },
        },
    },
    ar: {
        wrong: "حدث خطأ",
        products: {
            "add-category": {
                post: {
                    "category-exist": "هذا القسم موجود بالفعل.",
                    success: "لقد تم انشاء القسم بنجاح",
                },
            },
            "add-company": {
                post: {
                    "category-exist": "هذه الشركة  موجوده بالفعل.",
                    success: "لقد تم انشاء الشركة بنجاح",
                },
            },
            "add-product": {
                post: {
                    "products-exist": "هذه المنتجات موجوده بالفعل",
                    success: "لقد تم انشاء المنتج بنجاح.",
                },
            },
            "transfer-product": {
                put: {
                    "not-found": "هذا المنتج غير موجود.",
                    "not-modified": "لم يتم تعديل المنتج",
                    "just-available": "متاح فقط",
                    "in-the": "في",
                    market: "المحل",
                    store: "المخزن",
                    success: "لقد تم نقل المنتج بنجاح.",
                },
            },
        },
        clients: {
            "show-clients": {
                put: {
                    success: "لقد تم تعديل بيانات العميل بنجاح",
                },
                delete: {
                    success: "لقد تم حذف العميل بنجاح",
                },
            },
            "add-client": {
                post: {
                    "already-exist": "هذا العميل موجود بالفعل.",
                    success: "لقد تم انشاء العميل بنجاح.",
                },
            },
            "new-statement": {
                post: {
                    "not-enough": "غير كافي",
                    success: "لقد تم انشاء الفاتورة بنجاح.",
                },
            },
            "restore-statement": {
                post: {
                    "missing-bill": "لم يتم العثور علي فاتورة العميل.",
                    "products-not-exist": "بعض المنتجات غير متوفر عددها في الفاتورة",
                    "locker-not-enough": "لا يتوفر المبلغ المسترد في الخزنة",
                    success: "لقد تم استرجاع الفاتورة بنجاح.",
                },
                delete: {
                    "locker-not-enough": "لا يتوفر المبلغ المسترد في الخزنة",
                    success: "لقد تم استرجاع الفاتورة بنجاح.",
                },
            },
        },
        finances: {
            locker: {
                post: {
                    "locker-not-enough": "الخزنة لا تحتوي علي",
                    success: "لقد تم انشاء معامله جديدة بنجاح.",
                },
            },
        },
        organizations: {
            configs: {
                put: {
                    success: "لقد تم تعديل اعدادات المنظومة بنجاح.",
                },
            },
        },
        profile: {
            product: {
                get: {
                    "not-found": "لم يتم العثور علي المنتج.",
                },
                put: {
                    success: "لقد تم تعديل المنتج بنجاح.",
                },
                delete: {
                    "not-deleted": "لم يتم حذف المنتج.",
                    success: "لقد تم حذف المنتج بنجاح.",
                },
            },
            client: {
                put: {
                    "already-exist": "هذه الفاتورة مكتمله بالفعل.",
                    "salary-check": "المبلغ المدفوع اكبر من المبلغ المتبقي.",
                    success: "لقد تمت الدفعه الماليه بنجاح.",
                },
            },
            supplier: {
                put: {
                    "already-completed": "هذه الفاتورة مكتمله بالفعل.",
                    "not-enough": "كاش الخزنه لا يحتوي علي هذه الدفعه الماليه.",
                    "money-check": "الدفعه الماليه اكبر من المبلغ المتبقي.",
                    success: "لقد تمت الدفعه الماليه بنجاح.",
                },
            },
        },
        suppliers: {
            "show-suppliers": {
                put: {
                    "missing-data": "بعض البيانات مفقوده.",
                    success: "لقد تم تعديل المورد بنجاح.",
                },
                delete: {
                    success: "لقد تم حذف المورد بنجاح.",
                },
            },
            "show-bills": {
                delete: {
                    success: "لقد تم حذف فاتورة المورد بنجاح",
                },
            },
            "add-supplier": {
                put: {
                    "already-exist": "هذا المورد او المنتجات موجوده بالفعل",
                    success: "لقد تم اضافة المورد بنجاح.",
                },
            },
            "new-statement": {
                post: {
                    "not-exist-cash-statement": "كاش الخزنة لا يكفي لهذه الفاتورة.",
                    "not-exist-visa-statement": "كاش الفيزا لا يكفي لهذه الفاتورة.",
                    "not-exist-cash-paid": "كاش الخزنة اقل من المبلغ المدفوع.",
                    "not-exist-visa-paid": "كاش الفيزا اقل من المبلغ المدفوع.",
                    "not-updated-products": "بعض المنتجات لم يتم تعديلها.",
                    success: "لقد تم انشاء الفاتورة بنجاح.",
                },
            },
            "restore-statement": {
                post: {
                    "not-enough": "غير كافي",
                    success: "لقد تم استرجاع المنتجات بنجاح.",
                },
            },
        },
    },
};
