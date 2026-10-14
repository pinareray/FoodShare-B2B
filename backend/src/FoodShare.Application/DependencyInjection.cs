using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace FoodShare.Application;

public static class DependencyInjection
{
    /// <param name="handlerAssemblies">
    /// Outer-layer assemblies that contain additional MediatR handlers (e.g. SignalR notification handlers in WebAPI).
    /// </param>
    public static IServiceCollection AddApplication(this IServiceCollection services, params Assembly[] handlerAssemblies)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
            [typeof(DependencyInjection).Assembly, .. handlerAssemblies]));

        return services;
    }
}
