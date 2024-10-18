import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      {/* <div className="hidden w-64 bg-white p-4 shadow-md sm:block">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Header */}
        {/* <header className="bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header> */}

        {/* Dashboard Content */}
        <main className="p-4">
          {/* Content Boxes */}
          <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="bg-white p-4 rounded-lg shadow">
              <Skeleton className="h-6 w-1/2 mb-3" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-2 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do List */}
            <div className="bg-white p-4 rounded-lg shadow">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-4 rounded-lg shadow">
              <Skeleton className="h-6 w-2/5 mb-3" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Skeleton className="h-5 w-5 rounded mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-2 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table-like Structure */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
              {/* Table Rows */}
              {[...Array(5)].map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-4 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 mb-6 md:grid-cols-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
      </div>
    </div>
  );
}
