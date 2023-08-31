using Magicbrick.Interfaces;
using Magicbrick.Models;
using Magicbrick.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Magicbrick
{
    public class Program
    {

        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

         var tc = builder.Configuration.GetSection("Jwt");
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(op =>
            {
                op.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,

                    ValidateAudience = true,

                    ValidateLifetime = true,

                    ValidateIssuerSigningKey = true,

                    ValidIssuer = tc["Issuer"],

                    ValidAudience = tc["Audience"],

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tc["Key"]))
                };
            });
            // Add services to the container.

            builder.Services.AddControllers();



            builder.Services.AddDbContext<MagicBricksDbContext>(op => op.UseSqlServer(builder.Configuration["ConnectionString"]));


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IHash, HashRepo>();
            builder.Services.AddScoped<IGenric<Property>, propertyservice>();
            builder.Services.AddScoped<Emailservice, Emailservice>();


            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "Policy1",
                                  policy =>
                                  {
                                   //  policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                                     policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                                  });
            });

            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("Policy1");
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}