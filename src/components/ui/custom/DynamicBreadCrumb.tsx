import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";

interface DynamicBreadCrumbProps {
    breadCrumbPaths: any[];
}

const DynamicBreadCrumb = ({breadCrumbPaths}: DynamicBreadCrumbProps) => {
    return (
        <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {breadCrumbPaths.length > 0
            ? breadCrumbPaths.map((breadcrumbPath, index) => (
                <React.Fragment key={index}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={breadcrumbPath.path}>{breadcrumbPath.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </React.Fragment>
            ))
            : []
        }
        </BreadcrumbList>
      </Breadcrumb>
    );
}

export default DynamicBreadCrumb;