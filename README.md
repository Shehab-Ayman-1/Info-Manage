# TODO:

    - يأتي للادمن اشعار بامكانيه تفعيل احدي الاشتراكات مجاناً لمده 3 ايام وبعد ذلك تغلق

    - قم بوضع متغير جديد في الميتا ديتا للاورجانيزاشن يقوم بتحديد نهايه الاشتراك

    - Add Client Phone Number

    -   Add Red Dot To The Notifications Bill

    -   Edit The Notifications To Get The Insufficients Products, And Available Subscriptions

    -   Think About Barcode Reader

    -   Print In Small Printer

    -   Think About Clients Level

    -   Change The Role From orgRole To User.publicMetadata Custome Role

    -   المرتجعات

    -   البضائع السائله

    Learn Mongoose

    -   pre/post Middlewares
    -   Transactions
    -   Advanced Population
    -   Advanced Aggregation
    -   Advanced Queres
    -   Plugins

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
