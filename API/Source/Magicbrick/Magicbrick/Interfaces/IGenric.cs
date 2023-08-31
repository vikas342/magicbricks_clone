namespace Magicbrick.Interfaces
{
    public interface IGenric<T>
    {


        Task<List<T>> GetAll();

        Task<T> GetById(int id);

        Task<List<T>> Insert(T item);

        Task<List<T>> Delete(int id);
    }
}
