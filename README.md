# TODO:

    - Think About Clients Level

    - Create The Manage Organization Widget Again To Add Delete Member From The Org Members

    - Add List Of The Result To The Table Filter

    - Create New Tab In The UserButton Widget To Set The Organization Configs [Deleting Time Data, BronzeTo, SilverTo, Last Refresh Data Of Clients], And Any Minor Things Of The Organization Configs

    - Think About Deleting Data After 12 Months

    - Add Image By File Input In Create Company

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
