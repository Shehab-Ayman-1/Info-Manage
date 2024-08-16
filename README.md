# TODO:

    - [1] Add List Of The Result To The Table Filter.

    - [2] Add Image By File Input In Create Company.

    - [3] Enable Search By Barcode For Any Search Field.

    - [4] Create The Manage Organization Widget Again To Add Delete Member From The Org Members.

    - [5] Transaction Page
    -- Just Fetch The Transactions Of Selected Day By Date Input.
    -- Add Print Button To The Transactions Page.


    - [6] Create New Tab In The UserButton Widget To Set The Organization Configs
    -- Deleting Time Date
    -- BronzeTo, SilverTo
    -- Last Refresh Data Of Clients
    -- Any Minor Things Of The Organization Configs

    - [7] Think About Deleting Data After 12 Months.

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
