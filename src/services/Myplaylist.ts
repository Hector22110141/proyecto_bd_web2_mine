import boom from '@hapi/boom';
import { ObjectId } from 'mongoose';
import Myplaylist from '../models/myplaylist.model';
import Categories from '../models/category.model';
import { MyplaylistType } from '../types/myplaylist.type';

class MyplaylistService {
  async create(movieId: ObjectId, categoryId: ObjectId) {
    const newProduct = await Myplaylist.create({
      movie: movieId,
      category: categoryId
    }).catch((error) => {
      console.log('Could not save product', error);
      throw boom.badRequest('Could not save product');
    });

    const existingMyplaylist = await this.findById(newProduct._id);

    return existingMyplaylist;
  }

  async findAll() {
    const movies = await Myplaylist.find()
      .populate([{ path: 'category', select: '-__v' }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error);
        throw boom.badImplementation('Error while connecting to the DB');
      });

    if (!movies || movies.length === 0) {
      throw boom.notFound('There are no products');
    }
    return movies;
  }

  async findById(id: ObjectId) {
    const movie = await Myplaylist.findById(id)
      .populate([{ path: 'category', select: '-__v' }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error);
        throw boom.badImplementation('Error while connecting to the DB');
      });

    if (!movie) {
      throw boom.notFound('Movie not found');
    }
    return movie;
  }

  async findByName(name: string) {
    const movie = await Myplaylist.findOne({ name })
      .populate([{ path: 'category', select: '-__v' }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error);
        throw boom.badImplementation('Error while connecting to the DB');
      });

    if (!movie) {
      throw boom.notFound('Movie not found');
    }

    return movie;
  }

  async findByCategory(category: string) {
    const categories = await Categories.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error);
        throw boom.badImplementation('Error while connecting to the DB');
      }
    );

    if (!categories) {
      throw boom.notFound('Category not found');
    }

    const movies = await Myplaylist.find({ category: categories._id })
      .populate([{ path: 'category', select: '-__v' }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error);
        throw boom.badImplementation('Error while connecting to the DB');
      });

    if (!movies || movies.length === 0) {
      throw boom.notFound('Movies not found for the given category');
    }

    return movies;
  }
}

export default MyplaylistService;
