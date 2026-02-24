import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./components/theme-toggle";
import Settings from "./pages/Settings";
import Forms from "./pages/Forms";
import Notifications from "./pages/Notifications";
import FormDesigner from "./pages/FormDesigner";
import Database from "./pages/Database";
import Workflows from "./pages/Workflows";
import Lookups from "./pages/Lookups";
import { CustomForm } from "./pages/Form";
import FormEditor from "./pages/FormEditor";
import Documentation from "./pages/Documentation";

function App() {
  const url = useLocation()?.pathname;
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex flex-row items-center gap-3">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {url
                      .replace(/^\//, "")
                      ?.split("/")
                      ?.map((segment, index, array) => (
                        <BreadcrumbItem key={index}>
                          {index < array.length - 1 ? (
                            <>
                              <BreadcrumbLink
                                href={"/" + array.slice(0, index + 1).join("/")}
                              >
                                {segment.charAt(0).toUpperCase() +
                                  segment.slice(1).replace(/-/g, " ")}
                              </BreadcrumbLink>
                              <BreadcrumbSeparator className="hidden md:block" />
                            </>
                          ) : (
                            <BreadcrumbPage>
                              {segment.charAt(0).toUpperCase() +
                                segment.slice(1).replace(/-/g, " ")}
                            </BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                      ))}
                  </BreadcrumbList>
                </Breadcrumb>
                <ModeToggle />
              </div>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/forms" element={<Forms />} />
            <Route path="/dashboard/forms/form" element={<CustomForm />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/designer/forms" element={<FormDesigner />} />
            <Route path="/designer/forms/form" element={<FormEditor />} />
            <Route path="/designer/workflows" element={<Workflows />} />
            <Route path="/designer/lookups" element={<Lookups />} />
            <Route path="/designer/database" element={<Database />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
