# TODO:

    -   Active Basic Subscription ExpiresAt

    -   Change The Role From orgRole To User.publicMetadata Custome Role

    - Fetch The Products Instead Of Bills In The Today Purchase Receipt, And Today Sales Receipt

    -   Think About
        -- Barcode Reader
        -- Print In Small Printer
        -- Clients Level
        -- المرتجعات
        -- البضائع السائله

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
