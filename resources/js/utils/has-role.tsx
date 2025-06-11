import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function hasAnyRole(requiredRoles: string[]): boolean {
    const { auth } = usePage<PageProps>().props;

    // Grant access if the user is a super admin
    if (auth.super) {
        return true;
    }

    // Ambil nama-nama role user
    const userRoleNames = auth.user.roles.map(role => role.name);

    // Cocokkan dengan role yang dibutuhkan
    return requiredRoles.some(required => {
        // Support wildcard: "*-something"
        if (required.startsWith("*-")) {
            const suffix = required.slice(1);
            return userRoleNames.some(role => role.endsWith(suffix));
        }
        return userRoleNames.includes(required);
    });
}
