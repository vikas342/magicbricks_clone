using Magicbrick.Interfaces;
using Magicbrick.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


namespace Magicbrick.Repository
{
    public class propertyservice : IGenric<Property>
    {
        private readonly MagicBricksDbContext _context;

        public propertyservice(MagicBricksDbContext context)
        {
            _context = context;
        }

      

        async Task<List<Property>> IGenric<Property>.Delete(int id)
        {
            var data = await _context.Properties.FirstOrDefaultAsync(p => p.PropId == id);
            _context.Properties.Remove(data);
            _context.SaveChangesAsync();
            return _context.Properties.ToList();
        }

        async Task<List<Property>> IGenric<Property>.GetAll()
        {

            return _context.Properties.ToList();
        }










        async Task<Property> IGenric<Property>.GetById(int id)
        {

            var data = await _context.Properties.FirstOrDefaultAsync(p => p.PropId == id); 
            return data;

        }






        async Task<List<Property>> IGenric<Property>.Insert(Property item)
        {


            _context.Properties.AddAsync(item);
            _context.SaveChangesAsync ();
            return _context.Properties.ToList();


        }
    }
}
