# TODO:

    - Think About Clients Level

    - Make The Project Work On The Local DB, And Put Backup Button To Upload The Data On The Online DB

```ts
    const { user, organization, setActive, openUserProfile, getOrganization, createOrganization, client, frontendApi, ...rest } = useClerk();

    const { setActive, isLoaded, createOrganization, userInvitations, userMemberships, userSuggestions } = useOrganizationList();

    const { userId, has, orgId, orgRole, orgSlug, sessionId, isLoaded, actor, getToken, isSignedIn, signOut } = useAuth();

    const { sessions, isLoaded, setActive } = useSessionList();

    const { session, isLoaded, isSignedIn } = useSession();

    const { signUp, isLoaded, setActive ,} = useSignUp();

    const { signIn, isLoaded, setActive } = useSignIn();

    const { user, isLoaded, isSignedIn } = useUser();
```
