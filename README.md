# TODO:

    - Add Profits To The Client Props And Set The Trophies  Depend On This Profits

    - Clients, And Suppliers Payment Way

    - Update Bill

    - Think About
        -- البضائع السائله
        -- تفعيل خطه شرائح العملاء
        -- الربط بين اكثر من فرع
        -- البرينتر الصغيرة

    - Learn Mongoose
        -- pre/post Middlewares
        -- Transactions
        -- Advanced Population
        -- Advanced Aggregation
        -- Advanced Queres
        -- Plugins

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

```ts
    const transaction = {
        _id: string,
        orgId: string,
        creator: string,
        method: 'cash' | 'visa',
        process: 'withdraw' | 'deposit',
        total: number,
        history: [
            {
                _id: string,
                reason: string,
                price: number,
                createdAt: Date
            }
        ]
    }
```
