# TODO:

    - Determin Admin And Member Pages

```ts
    const { client, user, frontendApi, organization, openUserProfile, getOrganization, createOrganization, setActive } = useClerk();

    const { isLoaded, userInvitations, userMemberships, userSuggestions, setActive, createOrganization } = useOrganizationList();

    const { actor, isLoaded, getToken, has, isSignedIn, orgId, orgRole, orgSlug, sessionId, signOut, userId } = useAuth();

    const { sessions, isLoaded, setActive } = useSessionList();

    const { session, isLoaded, isSignedIn } = useSession();

    const { signUp, isLoaded, setActive ,} = useSignUp();

    const { signIn, isLoaded, setActive } = useSignIn();

    const { user, isLoaded, isSignedIn } = useUser();
```
