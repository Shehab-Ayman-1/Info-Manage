# TODO:

    - Make A Quick Client Statements For 1 Product By Default Values [unknown, cash, Pay All, Discount(0)]

    - In The Bill Products, Convert The Remove The Product Name, And Make It Ref To ProductId From Products Collection

    - Change The Role From orgRole To User.publicMetadata Custome Role

    - Think About Clients Level

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
