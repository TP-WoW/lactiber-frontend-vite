import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, FileText, Workflow } from "lucide-react";
import { useUser } from "@/hooks/use-user";

// Simulación de datos, reemplaza por tus fetch reales
const fetchDashboardData = async () => {
  // Aquí deberías hacer tus requests reales
  return {
    startedReports: 12,
    pendingReports: 5,
    unreadNotifications: 3,
    executedWorkflows: 8,
  };
};

export default function Dashboard() {
  const url = useLocation();
  const [kpis, setKpis] = useState({
    startedReports: 0,
    pendingReports: 0,
    unreadNotifications: 0,
    executedWorkflows: 0,
  });
  const {user} = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData().then(setKpis);
  }, []);

  return (
    <div className="flex flex-col w-full h-auto md:px-4 mx-0 px-0 gap-6">
      <h1 className="font-extrabold text-3xl uppercase mb-2">
        {url.pathname.replace(/^\//, "").split("/").join(" > ")}
      </h1>
      {user && (
        <div className="mb-2 text-3xl font-extrabold text-primary">
          ¡Hola, {user.displayName || user.userName}!
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer" onClick={() => navigate('/dashboard/forms')}>
          <CardHeader className="flex flex-col items-center">
            <FileText className="text-primary mb-2" size={32} />
            <CardTitle className="text-4xl font-bold">
              {kpis.startedReports}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground text-lg font-medium">
            Reportes iniciados
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer" onClick={() => navigate('/dashboard/pending-reports')}>
          <CardHeader className="flex flex-col items-center">
            <CheckCircle className="text-yellow-500 mb-2" size={32} />
            <CardTitle className="text-4xl font-bold">
              {kpis.pendingReports}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground text-lg font-medium">
            Reportes pendientes de aprobar
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer" onClick={() => navigate('/dashboard/notifications')}>
          <CardHeader className="flex flex-col items-center">
            <Bell className="text-blue-500 mb-2" size={32} />
            <CardTitle className="text-4xl font-bold">
              {kpis.unreadNotifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground text-lg font-medium">
            Notificaciones sin leer
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer" onClick={() => navigate('/dashboard/')}>
          <CardHeader className="flex flex-col items-center">
            <Workflow className="text-green-500 mb-2" size={32} />
            <CardTitle className="text-4xl font-bold">
              {kpis.executedWorkflows}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground text-lg font-medium">
            Workflows ejecutados
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
