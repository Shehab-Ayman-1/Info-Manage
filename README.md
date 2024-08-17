# TODO:

    - [5] Create The Manage Organization Widget Again To:
    -- Enable Delete Members From The Org Members.
    -- Disable Convert Users Role From Member To Admin

    - [6] Create New Tab In The UserButton Widget To Set The Organization Configs
    -- Deleting Time Date
    -- BronzeTo, SilverTo
    -- Last Refresh Data Of Clients
    -- Any Minor Things Of The Organization Configs

    - [7] Think About Deleting Data After 12 Months.

    - [8] Change The Role From orgRole To User.publicMetadata Custome Role

    - [8] Think About Clients Level

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
