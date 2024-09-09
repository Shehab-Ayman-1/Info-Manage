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
            trash: {
                put: {
                    success: "The Product Was Successfully Refundd Again.",
                },
            },
        },
        clients: {
            "show-clients": {
                put: {
                    "greater-payment-amount": "Payment Amount Is Greater Than The Client Pending Amount.",
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
            "refund-statement": {
                post: {
                    "missing-invoice": "The Client Invoice Not Found.",
                    "products-not-exist": "Some Products Count Is Not Exist In The Client Invoice",
                    "locker-not-enough": "Locker Doesn't Exist The Refundd Total Products Costs.",
                    success: "The Statement Was Successfully Refundd.",
                },
                delete: {
                    "locker-not-enough": "Locker Doesn't Exist The Refundd Total Products Costs.",
                    success: "The Statement Was Successfully Refundd.",
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
                    "already-exist": "This Invoice Is Already Completed.",
                    "salary-check": "The Payment Amount Is Greater Than The Pending Amount.",
                    success: "The Payment Was Successfully Done.",
                },
            },
            supplier: {
                put: {
                    "already-completed": "This Invoice Is Already Completed.",
                    "not-enough": "This Payment Amount Doesn't Exist In The Locker Cash.",
                    "money-check": "The Payment Amount Is Greater Than The Pending Amount.",
                    success: "The Payment Was Successfully Done.",
                },
            },
        },
        suppliers: {
            "show-suppliers": {
                put: {
                    "greater-payment-amount": "Payment Amount Is Greater Than The Client Pending Amount.",
                    "missing-data": "Missing Data.",
                    success: "The Supplier Was Successfully Updated.",
                },
                delete: {
                    success: "The Supplier Was Successfully Deleted.",
                },
            },
            "show-invoices": {
                delete: {
                    success: "The Supplier Invoice Was Successfully Deleted.",
                },
            },
            "add-supplier": {
                post: {
                    "already-exist": "This Supplier is Already Exist",
                    success: "The Supplier Was Successfully Added.",
                },
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
            "refund-statement": {
                post: {
                    "not-enough": "Not Enough",
                    success: "The Products Was Successfully Refundd.",
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
            trash: {
                put: {
                    success: "لقد تم استرجاع المنتج مرة اخرة بنجاح.",
                },
            },
        },
        clients: {
            "show-clients": {
                put: {
                    "greater-payment-amount": "المبلغ المدفوع اكبر من المبلغ المتبقي علي العميل.",
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
            "refund-statement": {
                post: {
                    "missing-invoice": "لم يتم العثور علي فاتورة العميل.",
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
                    "greater-payment-amount": "المبلغ المدفوع اكبر من المبلغ المتبقي علي العميل.",
                    "missing-data": "بعض البيانات مفقوده.",
                    success: "لقد تم تعديل المورد بنجاح.",
                },
                delete: {
                    success: "لقد تم حذف المورد بنجاح.",
                },
            },
            "show-invoices": {
                delete: {
                    success: "لقد تم حذف فاتورة المورد بنجاح",
                },
            },
            "add-supplier": {
                post: {
                    "already-exist": "هذا المورد موجود بالفعل",
                    success: "لقد تم اضافه المورد بنجاح.",
                },
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
            "refund-statement": {
                post: {
                    "not-enough": "غير كافي",
                    success: "لقد تم استرجاع المنتجات بنجاح.",
                },
            },
        },
    },
    ge: {
        wrong: "Etwas ist schief gelaufen.",
        products: {
            "add-category": {
                post: {
                    "category-exist": "Diese Kategorie existiert bereits.",
                    success: "Kategorie wurde erfolgreich erstellt.",
                },
            },
            "add-company": {
                post: {
                    "company-exist": "Dieses Unternehmen existiert bereits.",
                    success: "Unternehmen wurde erfolgreich erstellt.",
                },
            },
            "add-product": {
                post: {
                    "product-exists": "Diese Produkte existieren bereits.",
                    success: "Das Produkt wurde erfolgreich erstellt.",
                },
            },
            "transfer-product": {
                put: {
                    "not-found": "Das Produkt wurde nicht gefunden.",
                    "not-modified": "Das Produkt wurde nicht geändert.",
                    "just-available": "Nur verfügbar",
                    "in-the": "Im",
                    market: "Markt",
                    store: "Lager",
                    success: "Das Produkt wurde erfolgreich übertragen.",
                },
            },
            trash: {
                post: {
                    "already-exist": "Dieser Lieferant existiert bereits",
                    success: "Der Lieferant wurde erfolgreich hinzugefügt.",
                },
                put: {
                    success: "Das Produkt wurde erfolgreich wiederhergestellt",
                },
            },
        },
        clients: {
            "show-clients": {
                put: {
                    "greater-payment-amount": "Zahlungsbetrag ist größer als der ausstehende Betrag des Kunden.",
                    success: "Die Kundeninformationen wurden erfolgreich aktualisiert.",
                },
                delete: {
                    success: "Der Kunde wurde erfolgreich gelöscht.",
                },
            },
            "add-client": {
                post: {
                    "already-exist": "Dieser Kunde existiert bereits.",
                    success: "Der Kunde wurde erfolgreich erstellt.",
                },
            },
            "new-statement": {
                post: {
                    "not-enough": "Nicht genug",
                    success: "Die Erklärung wurde erfolgreich erstellt.",
                },
            },
            "refund-statement": {
                post: {
                    "missing-invoice": "Die Kundenrechnung wurde nicht gefunden.",
                    "products-not-exist": "Einige Produktmengen existieren nicht in der Kundenrechnung.",
                    "locker-not-enough": "Das Schließfach enthält nicht die wiederhergestellten Gesamtkosten der Produkte.",
                    success: "Die Erklärung wurde erfolgreich wiederhergestellt.",
                },
                delete: {
                    "locker-not-enough": "Das Schließfach enthält nicht die wiederhergestellten Gesamtkosten der Produkte.",
                    success: "Die Erklärung wurde erfolgreich wiederhergestellt.",
                },
            },
        },
        finances: {
            locker: {
                post: {
                    "locker-not-enough": "Das Schließfach enthält nicht genug.",
                    success: "Die Transaktion wurde erfolgreich erstellt.",
                },
            },
        },
        organizations: {
            configs: {
                put: {
                    success: "Die Organisationseinstellungen wurden erfolgreich aktualisiert.",
                },
            },
        },
        profile: {
            product: {
                get: {
                    "not-found": "Dieses Produkt wurde nicht gefunden.",
                },
                put: {
                    success: "Das Produkt wurde erfolgreich aktualisiert.",
                },
                delete: {
                    "not-deleted": "Das Produkt wurde nicht gelöscht.",
                    success: "Das Produkt wurde erfolgreich gelöscht.",
                },
            },
            client: {
                put: {
                    "already-exist": "Diese Rechnung ist bereits abgeschlossen.",
                    "salary-check": "Der Zahlungsbetrag ist höher als der ausstehende Betrag.",
                    success: "Die Zahlung wurde erfolgreich durchgeführt.",
                },
            },
            supplier: {
                put: {
                    "already-completed": "Diese Rechnung ist bereits abgeschlossen.",
                    "not-enough": "Dieser Zahlungsbetrag ist nicht im Schließfach vorhanden.",
                    "money-check": "Der Zahlungsbetrag ist höher als der ausstehende Betrag.",
                    success: "Die Zahlung wurde erfolgreich durchgeführt.",
                },
            },
        },
        suppliers: {
            "show-suppliers": {
                put: {
                    "greater-payment-amount": "Zahlungsbetrag ist größer als der ausstehende Betrag des Kunden.",
                    "missing-data": "Fehlende Daten.",
                    success: "Der Lieferant wurde erfolgreich aktualisiert.",
                },
                delete: {
                    success: "Der Lieferant wurde erfolgreich gelöscht.",
                },
            },
            "show-invoices": {
                delete: {
                    success: "Die Lieferantenrechnung wurde erfolgreich gelöscht.",
                },
            },
            "add-supplier": {
                put: {
                    "not-exist": "Dieser Lieferant / Diese Produkte existieren bereits.",
                    success: "Der Lieferant wurde erfolgreich hinzugefügt.",
                },
            },
            "new-statement": {
                post: {
                    "not-exist-cash-statement": "Das Schließfach enthält nicht die Kosten dieser Erklärung.",
                    "not-exist-visa-statement": "Visa enthält nicht die Kosten dieser Erklärung.",
                    "not-exist-cash-paid": "Das Schließfach enthält nicht die bezahlten Kosten.",
                    "not-exist-visa-paid": "Visa enthält nicht die bezahlten Kosten.",
                    "not-updated-products": "Einige Produkte wurden nicht aktualisiert.",
                    success: "Die Erklärung wurde erfolgreich erstellt.",
                },
            },
            "refund-statement": {
                post: {
                    "not-enough": "Nicht genug",
                    success: "Die Produkte wurden erfolgreich wiederhergestellt.",
                },
            },
        },
    },
};
