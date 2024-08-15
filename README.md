# TODO:

    - Add List Of The Result To The Table Filter

    - Think About Deleting Data After 12 Months

    - Add Image By File Input In Create Company.

    - Enable Search By Barcode For Any Search Field.

    - Transaction Page
    -- Just Fetch The Transactions Of Day Selected By Date Input
    -- Add Print Button To The Transactions Page

    - Create New Tab In The UserButton Widget To Set The Organization Configs [Deleting Time Data, BronzeTo, SilverTo, Last Refresh Data Of Clients], And Any Minor Things Of The Organization Configs

    - Create The Manage Organization Widget Again To Add Delete Member From The Org Members

    - Think About Clients Level

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
