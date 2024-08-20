# TODO:

    - تعديل صفحة الاشتراك علي الاشتراك البريميام و الانتربرايس  لاشتراكات شهرية فقط وتكون عبارة عن باكدجس
    - يأتي للادمن اشعار بامكانيه تفعيل احدي الاشتراكات مجاناً لمده 3 ايام وبعد ذلك تغلق
    - قم بوضع متغير جديد في الميتا ديتا للاورجانيزاشن يقوم بتحديد نهايه الاشتراك

    - Add Print Button To All Table Pages, And Print All The Products, Not Only The Show Products In The Table

    - Add Client Phone Number

    - Edit The Notifications To Get The Insufficients Products

    - Enable Multi Select To New Supplier

    - Think About Barcode Reader

    - Print In Small Printer

    - Think About Clients Level
    - Change The Role From orgRole To User.publicMetadata Custome Role
    - المرتجعات
    - البضائع السائبه

    Learn Mongoose
    - pre/post Middlewares
    - Transactions
    - Advanced Population
    - Advanced Aggregation
    - Advanced Queres
    - Plugins

```ts
    const { user, setActive, openUserProfile, organization, getOrganization, createOrganization, client, frontendApi, ...rest } = useClerk();

    const { isLoaded, setActive, createOrganization, userInvitations, userMemberships, userSuggestions } = useOrganizationList();

    const { isLoaded, userId, has, orgId, orgRole, orgSlug, sessionId, actor, getToken, isSignedIn, signOut } = useAuth();

    const { sessions, isLoaded, setActive } = useSessionList();

    const { session, isLoaded, isSignedIn } = useSession();

    const { signUp, isLoaded, setActive ,} = useSignUp();

    const { signIn, isLoaded, setActive } = useSignIn();

    const { user, isLoaded, isSignedIn } = useUser();
```
